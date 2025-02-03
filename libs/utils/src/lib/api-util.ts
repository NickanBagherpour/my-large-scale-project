import { MessageType, Nullable, UserRole } from '@oxygen/types';
import { getCookie } from './util';

export const ApiUtil = {
  downloadFile: function (data, type, extension, preferredName?) {
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
  getFile: function (serviceURL: string, params?: any, options?: any) {
    const { method = 'GET', encodeQuery = true, contentType = 'application/octet-stream' } = options ?? {};

    const xsrfTokenKey = 'XSRF-TOKEN';
    const xsrfToken = getCookie(xsrfTokenKey) as string;

    const xhr = new XMLHttpRequest();
    if (params && typeof params === 'object' && encodeQuery) {
      serviceURL = serviceURL + '?' + this.encodeQueryData(params);
    }

    return new Promise(function (resolve, reject) {
      xhr.open(method, serviceURL, true);
      xhr.responseType = 'blob';
      xhr.setRequestHeader('Content-type', contentType);
      xhr.setRequestHeader('X-XSRF-TOKEN', xsrfToken);

      if (method === 'POST' && !encodeQuery) {
        // If method is POST and encodeQuery is false, send params in the request body
        xhr.send(JSON.stringify(params));
      } else {
        xhr.send();
      }

      xhr.onload = function (e) {
        try {
          if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(e);
          }
        } catch (e) {
          reject(e);
        }
      };

      xhr.onerror = (error) => {
        reject(error);
      };
    });
  },
  encodeQueryData: function (data) {
    const ret: any[] = [];
    for (const d in data) {
      if (encodeURIComponent(data[d]) !== 'null') {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
    }
    return ret.join('&');
  },
  getErrorMessage: function (reason: any): MessageType | null {
    if (!reason) {
      return null;
    }

    let message: MessageType | null = null;

    try {
      const data = reason.response?.data;

      if (data?.message) {
        const hasDetails = !!data.detail;
        const hasErrors = data.errors && typeof data.errors === 'object';

        // Set title and description based on the presence of details
        let description;
        if (hasDetails) {
          description = data.detail;
        }

        // If errors exist, append their messages to description and set fields
        if (hasErrors) {
          const errorMessages = Object.values(data.errors).join('\n');
          if (description) {
            description += `\n${errorMessages}`;
          } else {
            description = errorMessages;
          }
        }
        message = {
          title: data.message,
          description: description,
          fields: data.errors,
          type: 'error',
          shouldTranslate: false,
        };
      }
    } catch (e) {
      console.error('Error processing getErrorMessage:', e);
    } finally {
      // Fallback to a generic error message if none was set
      if (!message?.description && !message?.type) {
        message = {
          title: 'common.error',
          description: 'message.unknown_error',
          type: 'error',
          shouldTranslate: true,
        };
      }
    }

    return message;
  },
  getApiPrefix: (role: Nullable<string>) => {
    if (!role) {
      return '';
    }
    return role === UserRole.COMMERCIAL_BANKING_ADMIN ? 'commercial/api' : 'business/api';
  },
};
