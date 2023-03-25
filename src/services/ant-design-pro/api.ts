// @ts-ignore
/* eslint-disable */
import request from '../../utils/request';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/admin/user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(data: Object) {
  return request<{
    data: API.CurrentUser;
  }>('/api/auth/login', {
    method: 'POST',
    data
  })
}

// 获取首页统计信息
export async function getInfo() {
  return request('/api/admin/index')
}

//获取用户列表
export async function getUserTable(params: Object) {
  return request('/api/admin/users', { params })
}

//启用禁用用户
export async function disUser(user: Object) {
  // @ts-ignore
  return request.patch(`/api/admin/users/${user.id}/lock`)
}

// 新建用户
export async function createUser(data: Object) {
  return request.post('/api/admin/users', { data })
}
// 更新用户信息
export async function upDataUser(userId: number, data: Object) {
  return request.put(`/api/admin/users/${userId}`, { data })
}





//获取商品列表
export async function getGoodsTable(params: Object) {
  return request('/api/admin/goods', { params })
}
//获取分类列表
export async function getCategoryTable() {
  return request('/api/admin/category')
}
//获取订单列表
export async function getOrdersTable(params) {
  return request('/api/admin/orders?include=goods,user,orderDetails', { params })
}

//上下架商品
export async function disGodds(goodsId: number) {
  // @ts-ignore
  return request.patch(`/api/admin/goods/${goodsId}/on`)
}
//是否推荐商品
export async function isRecommend(goodsId: number) {
  // @ts-ignore
  return request.patch(`/api/admin/goods/${goodsId}/recommend`)
}



// 获取阿里云OSS token
export async function getOSS() {
  return request('/api/auth/oss/token')
}


// 添加商品
export async function createGodds(data: Object) {
  return request.post('/api/admin/goods', { data })
}
//获取商品详情
export async function getGoodsInfo(goodsId: any) {
  return request(`/api/admin/goods/${goodsId}?include=category`)
}
// 更新商品信息
export async function upDataGoods(goodsId: number, data: Object) {
  return request.put(`/api/admin/goods/${goodsId}`, { data })
}


// 添加分类
export async function createCategory(data: Object) {
  return request.post('/api/admin/category', { data })
}
// 更新分类信息
export async function upDataCategory(categoryId: number, data: Object) {
  return request.put(`/api/admin/category/${categoryId}`, { data })
}


// 发送快递
export async function sendGoods(orderId: number, data: Object) {
  return request.patch(`/api/admin/orders/${orderId}/post`, { data })
}

















/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
