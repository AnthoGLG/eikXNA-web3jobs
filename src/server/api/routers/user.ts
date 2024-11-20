import { Configuration } from '@/core/configuration'
import { Trpc } from '@/core/trpc/server'
import { TRPCError } from '@trpc/server'
import * as Jwt from 'jsonwebtoken'
import { z } from 'zod'
import { EmailService } from '../../libraries/email'

export const UserRouter = Trpc.createRouter({
  inviteEmployer: Trpc.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        companyId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, companyId } = input

      // Check if email already exists
      const existingUser = await ctx.database.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Email already exists',
        })
      }

      // Check if company exists
      const company = await ctx.database.company.findUnique({
        where: { id: companyId },
      })

      if (!company) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Invalid company ID',
        })
      }

      // Create new user
      const newUser = await ctx.database.user.create({
        data: {
          name,
          email,
          companyId,
          role: 'EMPLOYER',
          status: 'INVITED',
        },
      })

      // Generate invitation token
      const payload = { email, userId: newUser.id }
      const secret = Configuration.getAuthenticationSecret()
      const token = Jwt.sign(payload, secret, { expiresIn: '24h' })

      // Update user with token
      await ctx.database.user.update({
        where: { id: newUser.id },
        data: { tokenInvitation: token },
      })

      // Send invitation email
      const invitationUrl = `${Configuration.getBaseUrl()}/register?token=${token}`
      await EmailService.send({
        type: EmailService.Type.AUTHENTICATION_WELCOME,
        email: newUser.email,
        name: newUser.name,
        subject: 'Invitation to join as an Employer',
        variables: {
          invitationUrl,
        },
      })

      return { success: true }
    }),
})
