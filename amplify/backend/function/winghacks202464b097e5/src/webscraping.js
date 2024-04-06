const Apify = require('apify');

(async () => {
  const requestQueue = await Apify.openRequestQueue();
  const kpopMemberUrls = [
    'https://www.famousbirthdays.com/people/bts-jin.html',
    'https://www.famousbirthdays.com/people/bts-suga.html',
    // Add more member URLs here
  ];

  kpopMemberUrls.forEach(url => requestQueue.addRequest({ url }));

  const crawler = await Apify.createCrawler({
    requestQueue,
    handlePageFunction: async ({ $, request }) => {
      const memberData = {
        url: request.url,
        name: $('h1.name').text().trim(),
        imageUrl: $('img.profile-image').attr('src'),
        bio: $('div.bio').text().trim(),
      };

      console.log(memberData);

      // Recursively fetch data for any related members
      const relatedMemberUrls = $('a.person-card').map((i, el) => $(el).attr('href')).get();
      relatedMemberUrls.forEach(url => requestQueue.addRequest({ url }));
    },
  });

  await crawler.run();
})();