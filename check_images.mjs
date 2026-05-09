import https from 'https';

const checkUrl = (url) => {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => resolve(false)).end();
  });
};

const checkAll = async () => {
  const possibleFiles = ['1.webp', '2.webp', '3.webp', '4.webp', 'cover_1.webp', 'Cover_1.webp', 'cover.webp'];
  
  for (let i = 1; i <= 10; i++) {
    const existing = [];
    for (const file of possibleFiles) {
      const url = `https://pub-9346dd0d7d8d4a61bbf08e53903451d4.r2.dev/images/FLAGPOLES/Flagpole${i}/${file}`;
      const exists = await checkUrl(url);
      if (exists) existing.push(file);
    }
    console.log(`Flagpole${i}:`, existing);
  }
};

checkAll();
