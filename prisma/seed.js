const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const cohort9 = await prisma.cohort.create({
    data: {
      name: "Cohort 9"
    }
  })
  
  const cohort10 = await prisma.cohort.create({
    data: {
      name: "Cohort 10"
    }
  })
  
  const cohort11 = await prisma.cohort.create({
    data: {
      name: "Cohort 11"
    }
  })

  const Jules = await prisma.teacher.create({
    data: {
      name: 'Jules',
      cohorts: {
        connect: {
          id: cohort9.id,
          id: cohort10.id,
          id: cohort11.id
        }
      }
    }
  })

  const newTeacher = await prisma.teacher.create({
    data: {
      name: 'Jeremy',
      cohorts: {
        create: {
          name: 'Cohort 12'
        }
      }
    },
    include: {
      cohorts: true
    }
  })

  const newTeacherManyCohorts = await prisma.teacher.create({
    data: {
      name: 'Kelly',
      cohorts: {
        create: [
          { name: 'Cohort 13' }, { name: 'Cohort 14' }
        ]
      }
    },
    include: {
      cohorts: true
    }
  })

  const newTeacherConnectOrCreate = await prisma.teacher.create({
    data: {
      name: 'Lorraine',
      email: 'lorraine@email.com',
      cohorts: {
        connectOrCreate: {
          where: { name: 'Cohort 14' },
          create: { name: 'Cohort 14' } 
        }
      }
    },
    include: {
      cohorts: true
    }
  })

  process.exit(0);
}

seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));
