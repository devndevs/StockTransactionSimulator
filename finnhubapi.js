const finnhub = require("finnhub");

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "catom42ad3ia1n9mnvgg";
const finnhubClient = new finnhub.DefaultApi();

module.exports.companyEarningsCal = finnhubClient.earningsCalendar(
  { from: "2022-06-01", to: "2022-06-30" },
  (error, data, response) => {
    console.log(data);
  }
);
