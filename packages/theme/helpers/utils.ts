import { useContext } from '@nuxtjs/composition-api'

export const formatDate = (date: string) => {
  const { app } = useContext()
  const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const toFormatDate = new Date(date);
  return app.i18n.t(monthsArray[toFormatDate.getMonth()]) + ' ' + toFormatDate.getDate() + ', ' + toFormatDate.getFullYear() + ' at ' + toFormatDate.getHours() + ':' + toFormatDate.getMinutes();
}