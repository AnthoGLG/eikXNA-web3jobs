import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `
INSERT INTO "Company" ("id", "name", "address", "website", "logo") VALUES ('21f17d6b-e180-4c76-a600-cd24cb3c31e4', 'Notion', '2 330 W Broadway, New York, NY 10013', 'https://www.notion.com' , 'https://i.imgur.com/36CSfYg.png');
INSERT INTO "Company" ("id", "name", "address", "website", "logo") VALUES ('40d0516f-033b-4e69-925d-e032a76b13a5', 'Slack', '6 443 E 6th St, New York, NY 10009', 'https://www.slack.com', 'https://i.imgur.com/l1lm0Mw.png');
INSERT INTO "Company" ("id", "name", "address", "website", "logo") VALUES ('1a184fa7-f3d3-405a-b308-30c1a3b3f8e3', 'Zapier', '6 443 E 6th St, New York, NY 10009', 'https://www.zapier.com', 'https://i.imgur.com/R5BxcpB.png');


INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "password", "role", "companyId") VALUES ('7cfa09cd-8caf-4935-864d-ca401d5da8f8', 'employer@test.com', 'Candy Cane', 'https://i.imgur.com/YfJQV5z.png?id=103', 'inv67890', 'VERIFIED', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 'EMPLOYER', '21f17d6b-e180-4c76-a600-cd24cb3c31e4');

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "password", "role") VALUES ('237dddac-b834-413f-a642-2b0071aabf5a', 'jobseeker@test.com', 'Dustin Time', 'https://i.imgur.com/YfJQV5z.png?id=111', 'inv78901', 'VERIFIED', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC', 'SEEKER');

INSERT INTO "JobOffer" ("id", "title", "description", "tags", "applicationDocumentsRequired", "companyId", "location") VALUES ('7f64a9d3-4279-4d2f-b0fa-426e3035ca21', 'Software Engineer', 'Join a fantastic company 

We are seeking a talented Software Engineer to join our dynamic team. You will be responsible for developing, testing, and maintaining scalable software solutions. Strong proficiency in programming languages like Java, Python, or C++ is required, along with experience in Agile development. Join us to innovate and solve complex technical challenges! Competitive salary and benefits offered.', 'Python,Javascript', '{RESUME,COVER_LETTER}', '21f17d6b-e180-4c76-a600-cd24cb3c31e4', 'London');
INSERT INTO "JobOffer" ("id", "title", "description", "tags", "applicationDocumentsRequired", "companyId", "location") VALUES ('db43ca9d-e9d8-4810-90f4-c39aabf4616a', 'Product Manager', 'Join a fantastic company 

We are seeking a talented Software Engineer to join our dynamic team. You will be responsible for developing, testing, and maintaining scalable software solutions. Strong proficiency in programming languages like Java, Python, or C++ is required, along with experience in Agile development. Join us to innovate and solve complex technical challenges! Competitive salary and benefits offered.', 'Asana,Excel', '{RESUME,COVER_LETTER}', '1a184fa7-f3d3-405a-b308-30c1a3b3f8e3', 'London');

INSERT INTO "JobOffer" ("id", "title", "description", "tags", "applicationDocumentsRequired", "companyId", "location") VALUES ('5b42f451-05f4-48da-860f-a12ab094f825', 'Software Manager', 'Join a fantastic company 

We are seeking a talented Software Engineer to join our dynamic team. You will be responsible for developing, testing, and maintaining scalable software solutions. Strong proficiency in programming languages like Java, Python, or C++ is required, along with experience in Agile development. Join us to innovate and solve complex technical challenges! Competitive salary and benefits offered.', 'Trello,Excel', '{RESUME,COVER_LETTER}', '40d0516f-033b-4e69-925d-e032a76b13a5', 'London');

INSERT INTO "Application" ("id", "jobOfferId", "userId") VALUES ('1e374a1a-e2b5-45a1-ae0c-6b336f4768d3', '7f64a9d3-4279-4d2f-b0fa-426e3035ca21', '237dddac-b834-413f-a642-2b0071aabf5a');
INSERT INTO "Application" ("id", "jobOfferId", "userId") VALUES ('99101bee-d6d7-48c2-9b30-41afd40e9e9e', 'db43ca9d-e9d8-4810-90f4-c39aabf4616a', '237dddac-b834-413f-a642-2b0071aabf5a');
INSERT INTO "Application" ("id", "jobOfferId", "userId") VALUES ('1cc9f62b-57f2-4e44-ba26-ea4e216502ca', '7f64a9d3-4279-4d2f-b0fa-426e3035ca21', '237dddac-b834-413f-a642-2b0071aabf5a');
  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
