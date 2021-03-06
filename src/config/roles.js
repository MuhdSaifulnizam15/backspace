const roles = ['customer', 'admin'];

const roleRights = new Map();

const getPermissionList = [
  'getUser', 'getUsers',
  'getState', 'getStates',
  'getCity', 'getCitys', 'getCityByState',
  'getCategory', 'getCategories',
  'getProduct', 'getProducts'
];
const customerPermissionList = [];
const adminManagePermissionList = ['manageUsers', 'manageState', 'manageCity', 'manageCategory', 'manageProduct'];

roleRights.set(roles[0], customerPermissionList.concat(getPermissionList));
roleRights.set(roles[1], adminManagePermissionList.concat(getPermissionList));

module.exports = {
  roles,
  roleRights,
};