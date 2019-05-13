export class Http {
  static fetchData(url) {
    return new Promise((resolve, reject) => {
      const HTTP = new XMLHttpRequest();
      // we open the request
      HTTP.open('GET', url);

      // we do something when the request state changes
      HTTP.onreadystatechange = function () {
        if (HTTP.readyState === XMLHttpRequest.DONE && HTTP.status === 200) {
          const RESPONSE_DATA = JSON.parse(HTTP.responseText);
          resolve(RESPONSE_DATA);
        } else if (HTTP.readyState === XMLHttpRequest.DONE) {
          // I'll do something else (reject...) in the case status != 200
          reject('Something went wrong');
        }
      };

      // but we have also to send the request in order to do something.
      HTTP.send();
    });
  }
}