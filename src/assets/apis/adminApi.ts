import { httpDelete, httpPost, httpPut, httpGet } from "@/utils/axiosConfig";

export interface IAdmin {
    name?: string
    phone: string;
    password: string;
    roleId?: perm;
    avatar?: string

}
interface perm {
    permissions: string[]
}

//管理员登录
export const adminLoginApi = (data: IAdmin) => {
    return httpPost('http://nocat.life:3014/admin/login', data)
}

//管理员查询
export const adminFindApi = (data?: any) => {
    return httpPost('/admin/search', data)
}

//电影分类
export const adminMovieApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/types/search', data)
}
//电影类型新增
export const addMovieTypeApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/types/add', data)
}
//删除
export const deleteMovieApi = (data: any) => {
    return httpDelete('http://nocat.life:3014/types/remove', data)
}

//电影院品牌分页
export const addCinemaBrandApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/theatres/search', data)
}

//删除品牌
export const deleteMoviebrandApi = (data?: any) => {
    return httpDelete('http://nocat.life:3014/theatreBrands/remove', { data })
}
//电影院品牌新增
export const addMoviebrandApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/theatreBrands/add', data)
}

//影城渲染
export const addmovieCityApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/theatres/search', data)
}
//电影院新增
export const addcinemaApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/theatres/add', data)
}
//删除影院
export const deletecinemaApi = (_id?: any) => {
    return httpDelete('http://nocat.life:3014/theatres/remove', _id)
}

//修改电影类型
export const onMoviemodifyApi = (data?: any) => {
    return httpPut('http://nocat.life:3014/types/update', data)
}

//获取上映国家
export const addcountryApi = (data?: any) => {
    return httpGet('http://nocat.life:3014/regions/getAll', { data })
}

//获取年份
export const addMovieYear = (data?: any) => {
    return httpGet('http://nocat.life:3014/movieYears/getAll', { data })
}

//获取所有电影
export const addMovieApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/movies/search', data)
}

//增加新电影
export const addNewMovieApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/movies/add', data)
}
//删除电影
export const deleteMovie2Api = (data?: any) => {
    return httpDelete('http://nocat.life:3014/movies/remove', data)
}
//获取电影详情
export const obtainDetailsApi = (data?: any) => {
    return httpGet('http://nocat.life:3014/movies/getById', data)
}
//修改电影详情
export const onMoviedetailsApi = (data?: any) => {
    return httpPut('http://nocat.life:3014/movies/update', data)
}
//获取全部电影演职人员
export const addMoviePerformerApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/persons/search', data)
}
//获取单独电影的演职人员
export const addOneMoviePerformerApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/casts/getByMovie', data)
}
//添加单独电影的演职人员
export const OneMoviePerformerApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/casts/add', data)
}
//获取管理员
export const getTableDataApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/admin/search', data)
}
//获取单独电影院详情
export const oneCinemaApi = (data?: any) => {
    return httpGet('http://nocat.life:3014/theatres/getById', data)
}
//获取单独电影院获取影厅
export const getCinemaApi = (data?: any) => {
    return httpGet('http://nocat.life:3014/halls/getByTheatreId', data)
}
//放映厅所有类型
export const getqueryTypeApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/hallTypes/search', data)
}
//放映厅设备配置
export const getequipmentApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/facility/search', data)
}
//添加啊放映厅
export const addqueryApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/halls/add', data)
}
//获取所有角色
export const addadministratorApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/role/search', data)
}
//添加角色
export const addcharacterApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/role/add', data)
}

//删除角色
export const deletecharacterApi = (data?: any) => {
    return httpDelete('http://nocat.life:3014/role/remove', data)
}
//添加管理员
export const addadministrator2Api = (data?: any) => {
    return httpPost('http://nocat.life:3014/admin/add', data)
}
//获取管理员信息
export const getglobalApi = (data?: any) => {
    return httpGet('http://nocat.life:3014/admin/getInfo', data)
}
//删除管理员
export const deleteadministratorApi = (data?: any) => {
    return httpDelete('http://nocat.life:3014/admin/remove', data)
}
//修改管理员
export const modifyAdministratorApi = (data?: any) => {
    return httpPut('http://nocat.life:3014/admin/update', data)
}
//获取演员职业
export const addoccupationApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/profession/search', data)
}
//获取所有演职人员
export const addperformerApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/persons/search', data)
}
//获取所有放映厅
export const addScreeningApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/halls/search', data)
}
//获取所有放映语言
export const addlanguageApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/showLanguage/search', data)
}
//获取所有电影排片
export const addMovierankingApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/schedules/search', data)
}
//新增排片
export const addqueueApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/schedules/add', data)
}
//删除排片
export const deletequeueApi = (data?: any) => {
    return httpDelete('http://nocat.life:3014/schedules/remove', data)
}
//修改排片
export const rankingApi = (data?: any) => {
    return httpPut('http://nocat.life:3014/schedules/update', data)
}
//查询订单
export const addorderApi = (data?: any) => {
    return httpPost('http://nocat.life:3014/orders/search', data)
}