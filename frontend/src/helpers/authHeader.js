export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user && user.accessToken) {
    if (user.role !== 'student') {
      return { 'x-access-token': user.accessToken, 'x-employeeID': user._id }
    } else {
      return { 'x-access-token': user.accessToken, 'x-studentID': user._id }
    }
  } else {
    return { from: 'EasyBookManagement' }
  }
}
