export const addBtnListner = (selector, callback) => {
  $(document).on(
    {
      mouseenter: function () {
        $(selector).addClass("hover");
      },
      mouseleave: function () {
        $(selector).removeClass("hover");
      },
      click: callback,
      touchend: callback,
    },
    selector
  );
};

export const downloadCsv = (csvContent, fileName) => {
  const encodedUri =
    "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
};

export const wait = async (seconds = 1) => {
  const rndFactor = Math.floor(Math.random());
  await new Promise((resolve) =>
    setTimeout(resolve, (rndFactor + seconds) * 1000)
  );
};

export const getRandWaitTime = (range) => {
  if (range) {
    const [start, end] = range.split("-").map((a) => parseInt(a));
    return Math.round(Math.random() * (end - start) + start);
  }
  return 0;
};

export const showLoader = () => {
  $(".ut-click-shield").addClass("showing");
  $(".loaderIcon ").css("display", "block");
};

export const hideLoader = () => {
  $(".ut-click-shield").removeClass("showing");
  $(".loaderIcon ").css("display", "none");
};

export const networkCallWithRetry = (execution, delay, retries) =>
  new Promise((resolve, reject) => {
    return execution()
      .then(resolve)
      .catch((reason) => {
        if (retries > 0) {
          return wait(delay)
            .then(
              networkCallWithRetry.bind(null, execution, delay, retries - 1)
            )
            .then(resolve)
            .catch(reject);
        }
        return reject(reason);
      });
  });

export const generateId = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const createElementFromHTML = (htmlString) => {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};
