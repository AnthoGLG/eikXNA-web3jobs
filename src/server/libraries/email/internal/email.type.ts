export enum EmailType {
  DEFAULT = 'default',
  AUTHENTICATION_WELCOME = 'authentication.welcome.password',
  AUTHENTICATION_FORGOT_PASSWORD = 'authentication.forgot.password',
  AUTHORIZATION_VERIFICATION_CODE = 'authorization.verification.code',
  NOTIFICATION_EMPLOYER_JOB_APPLY = 'notification.employer.job.application',
}

export const EmailSender = {
  default: {
    email: 'no-reply@marblism.com',
    name: 'Marblism',
  },
}
