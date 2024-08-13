export const ApiUtil = {
  downloadFile: function(data: any, type: any, extension: any, preferredName?: any) {
    const blob = new Blob([data], { type: type });
    const downloadUrl = URL.createObjectURL(blob);

    if (/(iP)/g.test(navigator.userAgent)) {
      alert('Your device do not support files downloading. Please try again in desktop browser.');
      return false;
    }
    const link = document.createElement('a');
    link.href = downloadUrl;
    if (link.download !== undefined) {
      if (!preferredName) {
        link.download = downloadUrl.substring(downloadUrl.lastIndexOf('/') + 1, downloadUrl.length) + '.' + extension;
      } else link.download = preferredName;
    }
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, false);
      link.dispatchEvent(e);
      return true;
    }

    return false;
  },
  encodeQueryData: function(data: any) {
    const ret: any[] = [];
    for (const d in data) {
      if (encodeURIComponent(data[d]) !== 'null') {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
    }
    return ret.join('&');
  },
  getErrorMessage: function(reason: any) {
    if (!reason) {
      return null;
    }

    let errorMessage: any = {};

    try {
      if (reason.response.data.message) {
        errorMessage = {
          txt: reason.response.data.message,
          type: 'error',
          shouldTranslate: false,
        };
      } else if (reason.response.data.subErrors && reason.response.data.subErrors.length !== 0) {
        errorMessage = {
          txt: reason.response.data.subErrors[0].localizedMessage,
          type: 'error',
          shouldTranslate: false,
        };
      } else if (reason.response.data.localizedMessage) {
        errorMessage = {
          txt: reason.response.data.localizedMessage,
          type: 'error',
          shouldTranslate: false,
        };
      } else if (reason.response.data.localMessage) {
        errorMessage = {
          txt: reason.response.data.localMessage,
          type: 'error',
          shouldTranslate: false,
        };
      } /*else {
            errorMessage = {
                txt: "unknown-error", type: 'error',
                shouldTranslate: true,
            };
        }*/
    } catch (e) {
      //
    } finally {
      if (!errorMessage?.txt && !errorMessage?.type) {
        errorMessage = {
          txt: 'error.unknown_error',
          type: 'error',
          shouldTranslate: true,
        };
      }
    }

    return errorMessage;
  },
  delayedApi: async function(apiRequest, delay=2000): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const response = await apiRequest();
          resolve(response);
        } catch (e) {
          reject(e);
        }
      }, delay);
    });
  },
};
