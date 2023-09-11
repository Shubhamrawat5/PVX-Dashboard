import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import random from 'random-name';

const GROUPS = 50;

const MEMBERS = 500;

const VOTINGS = 15;

const BIRTHDAYS = 200;

const COUNT_WILL_BE = GROUPS * MEMBERS;

const places = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
  'Delhi',
  'Puducherry',
  'Ladakh',
  'Lakshadweep',
  'Ladakh',
  'Lakshadweep',
];

type Arr = Array<string | number>;

const randomTill = (num: number, from = 0): number => {
  const ranNum = Math.round(Math.random() * num);
  return ranNum < from ? randomTill(num, from) : ranNum;
};

const getRandom = (arr: Arr): string | number => {
  const result = arr[randomTill(arr.length)];
  return result === undefined ? getRandom(arr) : result;
};

const getNumber = () => {
  let number = randomTill(99999999);
  let prefixes = [];
  for (let i = 70; i <= 99; i++) {
    prefixes.push(i);
  }
  return `${getRandom(prefixes)}${number}`;
};

const getUniqueMobileNumber = (arr: Arr): string => {
  const number = getNumber();
  if (arr.includes(number)) {
    return getUniqueMobileNumber(arr);
  } else {
    return number;
  }
};

const numbers = (count: number) => {
  let tmparr: Arr = [];
  for (let i = 0; i < count; i++) {
    tmparr.push(getUniqueMobileNumber(tmparr));
  }
  return tmparr;
};

const getFullName = () => {
  const hasMiddleName = randomTill(1000) % 2 === 0;
  const first = random.first();
  const middlle = hasMiddleName ? ' ' + random.middle() + ' ' : ' ';
  const last = random.last();
  return `${first}${middlle}${last}`;
};

async function main() {
  const seedGroups = async () => {
    await prisma.group.createMany({
      data: numbers(GROUPS).map((num, index) => ({
        groupjid: `${num}-${Date.now()}@g.us`,
        gname: 'Group Name ' + index,
      })),
    });
    return await prisma.group.findMany();
  };

  const groups = await seedGroups();

  const seedMembers = async () => {
    await prisma.member.createMany({
      data: numbers(MEMBERS).map((num) => ({
        donation: randomTill(8500),
        memberjid: `${num}@s.whatsapp.net`,
        name: getFullName(),
      })),
    });
    return await prisma.member.findMany();
  };

  const members = await seedMembers();

  const seedCount = async () => {
    const data = [];
    for (const mem of members) {
      for (const grp of groups) {
        data.push({
          groupGroupjid: grp.groupjid,
          memberMemberjid: mem.memberjid,
          message_count: randomTill(5000),
          warning_count: randomTill(3),
          video_count: randomTill(400),
        });
      }
    }
    await prisma.countmember.createMany({ data });
  };

  const seedVoting = async () => {
    const gps: Arr = [];
    const getGroup = (): string | number => {
      const randomGroup = getRandom(groups.map((g) => g.groupjid));
      if (gps.includes(randomGroup)) {
        return getGroup();
      } else {
        return randomGroup;
      }
    };
    for (let i = 0; i < VOTINGS; i++) {
      gps.push(getGroup());
    }
    return prisma.voting.createMany({
      data: gps.map((gpid, i) => ({
        groupjid: gpid.toString(),
        is_started: false,
        started_by: random(members.map((m) => m.memberjid)),
        title: 'Voting ' + i,
      })),
    });
  };

  const seedBdays = async () => {
    return prisma.bday.createMany({
      data: numbers(BIRTHDAYS).map((num) => {
        const name = getFullName();
        return {
          number: num.toString(),
          date: randomTill(31, 1),
          month: randomTill(12, 1),
          year: randomTill(2015, 1960),
          name,
          username: name.replaceAll(' ', '').toLowerCase(),
          place: getRandom(places).toString(),
        };
      }),
    });
  };

  return Promise.all([seedBdays, seedVoting, seedCount]);
}

main()
  .then(async () => {
    console.log('Data seeded');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
