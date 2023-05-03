// Register types ------------------------------

interface CreateUpdate {
  createdAt: string
  updatedAt: string
}

export interface IRegisterResponse extends CreateUpdate {
  username: string
  isAdmin: boolean
  id: string
}

export interface ResponseDataRegister {
  status_code: number
  data: IRegisterResponse
}

export interface IRegisterPost extends Pick<IRegisterResponse, 'username' | 'isAdmin'> {
  password: string
}

// login types ------------------------------

export interface ILogin extends Omit<IRegisterPost, 'isAdmin'> { }

export interface ILoginResponse {
  token: string
  username: string
  id: string
}

export interface ResponseDataLogin {
  status_code: number
  data: ILoginResponse
}

// products types----------------------------

// get all
export interface IProductCard extends Omit<IProductPost, 'marca'> {
  marca: IMarcas
}
export interface IProductPost {
  name: string
  description: string
  image_url: string
  price: number
  marca: string
}
export interface IProductGetResponse extends Omit<IProductPost, 'marca'>, CreateUpdate {
  id: string
  marca: IMarcas
}

export interface ResponseDataProductGet {
  status_code: number
  data: IProductGetResponse[]
  lengthData: number
}

// get for id
export interface ResponseDataProductGetId {
  status_code: number
  data: IProductGetResponse
}

export interface IProductPostResponse extends IProductPost, CreateUpdate {
  id: string
}

export interface ResponseDataProductPost {
  status_code: number
  data: IProductPostResponse
}

// delete for id

export interface ResponseDataProductDel {
  status_code: number
  data: IProductDel
}

export interface IProductDel extends IProductPostResponse { }

// put for id

export interface ResponseDataProductPut {
  status_code: number
  data: IProductPut
}

export interface IProductPut extends IProductPostResponse { }

export interface IProductPutFetch {
  id?: string
  values: IProductPost
}

// marcas types----------------------------------

export interface ResponseDataMarcas {
  status_code: number
  data: IMarcas[]
}

export interface IMarcas {
  name: string
  logo_url: string
  id: string
}
