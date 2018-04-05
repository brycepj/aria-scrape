const cheerio = require('cheerio');
const axios = require('axios');

let $;

const fetchHTML = (url) => {
  return axios.get(url);
};


fetchHTML('https://facebook.com').then((resp) => {

  const html = resp.data;

  $ = cheerio.load(html);

  const links = $('a').map(function(i, elem) {
    return $(this).attr('href');
  }).get();

  const hasRolePresentation = getMatchingSelectors('[role="presentation"]');
  const hasAriaHidden = getMatchingSelectors('[aria-hidden="true"]');

  console.log(`
    links: ${links}
    hasRolePresentation: ${hasRolePresentation}
    hasAriaHidden: ${hasAriaHidden}
  `);
});


function getMatchingSelectors(selector) {
  return getMatchingElemAttributes(selector).map((elem) => {
    return elem.id ? elem.id : (elem.class ? elem.class : elem.tagName);
  });
}

function getMatchingElemAttributes(selector) {
  return $(selector).map(function() {
    const elem = $(this).get(0);
    return Object.assign({}, elem.attribs, { tagName: elem.tagName});
  }).get();
}




