import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // Create Cameras
  const camera1 = await prisma.camera.create({
    data: {
      name: 'Shop Floor A',
      location: 'Main Retail Area',
    },
  });

  const camera2 = await prisma.camera.create({
    data: {
      name: 'Vault',
      location: 'Secure Storage',
    },
  });

  const camera3 = await prisma.camera.create({
    data: {
      name: 'Main Entrance',
      location: 'Lobby',
    },
  });

  const camera4 = await prisma.camera.create({
    data: {
      name: 'Parking Lot',
      location: 'Exterior',
    },
  });

  // Create Incidents
  const now = new Date();
  const incidents = [
    {
      cameraId: camera1.id,
      type: 'Unauthorised Access',
      tsStart: new Date(now.getTime() - 1000 * 60 * 120), // 2 hours ago
      tsEnd: new Date(now.getTime() - 1000 * 60 * 118),
      thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753206796/4K-security-camera-snapshot_reyfcq.jpg',
      secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753270516/Gemini_Generated_Image_gb0kudgb0kudgb0k_hsyemx.png',
    },
    {
      cameraId: camera3.id,
      type: 'Gun Threat',
      tsStart: new Date(now.getTime() - 1000 * 60 * 90), // 1.5 hours ago
      tsEnd: new Date(now.getTime() - 1000 * 60 * 89),
      thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753270516/Gemini_Generated_Image_gb0kudgb0kudgb0k_hsyemx.png',
      resolved: true,
      secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753207701/home-security-camera-snapshot_d2n7ag.jpg',
    },
    {
      cameraId: camera2.id,
      type: 'Face Recognised',
      tsStart: new Date(now.getTime() - 1000 * 60 * 60), // 1 hour ago
      tsEnd: new Date(now.getTime() - 1000 * 60 * 59),
      thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753270369/Gemini_Generated_Image_qp8vjyqp8vjyqp8v_gmpg5b.png',
      secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753207701/home-security-camera-snapshot_d2n7ag.jpg',
    },
    {
      cameraId: camera4.id,
      type: 'Suspicious Activity',
      tsStart: new Date(now.getTime() - 1000 * 60 * 45), // 45 mins ago
      tsEnd: new Date(now.getTime() - 1000 * 60 * 44),
      thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753270371/sus_h7gken.png',
      secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753207701/home-security-camera-snapshot_d2n7ag.jpg',
    },
    {
      cameraId: camera1.id,
      type: 'Loitering',
      tsStart: new Date(now.getTime() - 1000 * 60 * 30), // 30 mins ago
      tsEnd: new Date(now.getTime() - 1000 * 60 * 28),
      thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753270365/Gemini_Generated_Image_qv5u7yqv5u7yqv5u_nf05uc.png',
      secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753207701/home-security-camera-snapshot_d2n7ag.jpg',
    },
    {
      cameraId: camera3.id,
      type: 'Unauthorised Access',
      tsStart: new Date(now.getTime() - 1000 * 60 * 15), // 15 mins ago
      tsEnd: new Date(now.getTime() - 1000 * 60 * 14),
      thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753270373/gemingenrate_vt8wsg.png',
      secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753221042/sus_egw9hf.png',
    },
    {
      cameraId: camera4.id,
      type: 'Suspicious Activity',
      tsStart: new Date(now.getTime() - 1000 * 60 * 5), // 5 mins ago
      tsEnd: new Date(now.getTime() - 1000 * 60 * 4),
      thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753270371/Gemini_Generated_Image_x5unp4x5unp4x5un_q4nqbb.png',
      secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753271293/Gemini_Generated_Image_pa8e80pa8e80pa8e_b6m8wj.png',
    },
    {
        cameraId: camera1.id,
        type: 'Loitering',
        tsStart: new Date(now.getTime() - 1000 * 60 * 180),
        tsEnd: new Date(now.getTime() - 1000 * 60 * 178),
        thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753270753/Gemini_Generated_Image_l2xr3nl2xr3nl2xr_typrwy.png',
        secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753207701/home-security-camera-snapshot_d2n7ag.jpg',
    },
    {
        cameraId: camera2.id,
        type: 'Face Recognised',
        tsStart: new Date(now.getTime() - 1000 * 60 * 200),
        tsEnd: new Date(now.getTime() - 1000 * 60 * 199),
        thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753271138/Gemini_Generated_Image_cclcr3cclcr3cclc_pvwj6d.png',
        resolved: true,
        secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753207701/home-security-camera-snapshot_d2n7ag.jpg',
    },
    {
        cameraId: camera3.id,
        type: 'Unauthorised Access',
        tsStart: new Date(now.getTime() - 1000 * 60 * 20),
        tsEnd: new Date(now.getTime() - 1000 * 60 * 19),
        thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753271152/Gemini_Generated_Image_9y3oom9y3oom9y3o_ruvtfk.png',
        secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753207701/home-security-camera-snapshot_d2n7ag.jpg',
    },
    {
        cameraId: camera4.id,
        type: 'Gun Threat',
        tsStart: new Date(now.getTime() - 1000 * 60 * 10),
        tsEnd: new Date(now.getTime() - 1000 * 60 * 9),
        thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753271027/Gemini_Generated_Image_ma5g7qma5g7qma5g_js0uxd.png',
        secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753270516/Gemini_Generated_Image_gb0kudgb0kudgb0k_hsyemx.png',
    },
    {
        cameraId: camera1.id,
        type: 'Suspicious Activity',
        tsStart: new Date(now.getTime() - 1000 * 60 * 50),
        tsEnd: new Date(now.getTime() - 1000 * 60 * 49),
        thumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753271293/Gemini_Generated_Image_pa8e80pa8e80pa8e_b6m8wj.png',
        secondaryThumbnailUrl: 'https://res.cloudinary.com/dqfeeuhgq/image/upload/v1753207701/home-security-camera-snapshot_d2n7ag.jpg',
    }
  ];

  for (const data of incidents) {
    await prisma.incident.create({ data });
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
