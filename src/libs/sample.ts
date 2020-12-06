/**
 * ApiResponse
 */
export interface ApiResponse {
  /**
   * code
   * @type integer
   * @format int32
   */
  code: number;
  /**
   * type
   * @type string
   */
  type: string;
  /**
   * message
   * @type string
   */
  message: string;
}

/**
 * Category
 * @name Category
 */
export interface Category {
  /**
   * id
   * @type integer
   * @format int64
   */
  id: number;
  /**
   * name
   * @type string
   */
  name: string;
}

/**
 * Pet
 */
export interface Pet {
  /**
   * id
   * @type integer
   * @format int64
   */
  id?: number;
  /**
   * category
   */
  category?: Category;
  /**
   * name
   * @type string
   * @example doggie
   */
  name: string;
  /**
   * photoUrls
   * @type array
   * @items photoUrl string
   */
  photoUrls: Array<string>;
  /**
   * tags
   * @type array
   * @items Tag object
   */
  tags?: Array<Tag>;
  /**
   * status
   * @type string
   * @enum 'available', 'pending', 'sold'
   * @description 'pet status in the store'
   */
  status?: 'available' | 'pending' | 'sold';
}

/**
 * Tag
 * @name Tag
 */
export interface Tag {
  /**
   * id
   * @type: integer
   * @format int64
   */
  id?: number;
  /**
   * name
   * @type string
   */
  name?: string;
}

/**
 * Order
 * @name Order
 */
export interface Order {
  /**
   * id
   * @type integer
   * @format int64
   */
  id?: number;
  /**
   * petId
   * @type integer
   * @format int64
   */
  petId?: number;
  /**
   * quantity
   * @type integer
   * @format int32
   */
  quantity?: number;
  /**
   * shipDate
   * @type string
   * @format date-time
   */
  shipDate?: string;
  /**
   * status
   * @type string
   * @enum 'placed', 'approved', 'delivered'
   * @description Order Status
   */
  status?: 'placed' | 'approved' | 'delivered';
  /**
   * complete
   * @type boolean
   */
  complete?: boolean;
}

/**
 * User
 * @name User
 */
export interface User {
  /**
   * id
   * @type integer
   * @format int64
   */
  id?: number;
  /**
   * username
   * @type string
   */
  username?: string;
  /**
   * firstName
   * @type string
   */
  firstName?: string;
  /**
   * lastName
   * @type string
   */
  lastName?: string;
  /**
   * email
   * @type string
   */
  email?: string;
  /**
   * password
   * @type string
   */
  password?: string;
  /**
   * phone
   * @type string
   */
  phone?: string;
  /**
   * userStatus
   * @type integer
   * @format int32
   * @description User Status
   */
  userStatus?: number;
}
