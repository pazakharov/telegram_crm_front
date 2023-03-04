const baseApi = process.env.VUE_APP_BASE_API

module.exports = {

  title: 'Telagram CRM',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,
  baseApi: baseApi
}
