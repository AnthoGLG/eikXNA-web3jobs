import { Trpc } from '@/core/trpc/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { EmailService } from '../libraries/email/email.service'

export const EmailRouter = Trpc.createRouter({
  sendToUser: Trpc.procedure
    .input(
      z.object({
        userId: z.string(),
        subject: z.string(),
        type: z.nativeEnum(EmailService.Type),
        content: z.string().optional(),
        variables: z.record(z.string(), z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.databaseUnprotected.user.findUnique({
          where: { id: input.userId },
        })

        await EmailService.send({
          name: user.name,
          email: user.email,
          subject: input.subject,
          type: input.type,
          content: input.content,
          variables: input.variables,
        })
        return { success: true, message: 'Email sent successfully' }
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send email',
        })
      }
    }),
  sendToCompany: Trpc.procedure
    .input(
      z.object({
        companyId: z.string(),
        subject: z.string(),
        type: z.nativeEnum(EmailService.Type),
        content: z.string().optional(),
        variables: z.record(z.string(), z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.databaseUnprotected.user.findFirst({
          where: { companyId: input.companyId },
        })

        await EmailService.send({
          name: user.name,
          email: user.email,
          subject: input.subject,
          type: input.type,
          content: input.content,
          variables: input.variables,
        })
        return { success: true, message: 'Email sent successfully' }
      } catch (error) {
        console.log(error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send email',
        })
      }
    }),
})
