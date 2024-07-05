type useCookieType = {
    setCookie: (cname: string, cvalue: string, exdays: number) => void
    getCookie: (cname: string) => string
    deleteCookie: (cname: string) => void
    deleteAllCookies: () => void
}

export const useCookie = (): useCookieType => {
    function setCookie(cname: string, cvalue: string, exdays: number): void {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
      
    function getCookie(cname: string): string {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
      
    function deleteCookie(cname: string): void {
        document.cookie = cname + "=";
      }
      
    function deleteAllCookies(): void {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie =
          name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    }

    return {setCookie, getCookie, deleteCookie, deleteAllCookies}
}