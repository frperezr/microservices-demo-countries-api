// node modules
import { Client } from 'pg'
import squel from 'squel'

// lib
import { TCart, TCartItem } from '../../../../../lib/ts/types'
import { IStore } from '../../../../../lib/ts/interfaces'
import { camelCaseObject } from '../../../../../lib/ts/transform'

// queries
import { getQuery, listQuery } from './queries'

class Cart implements IStore {
  private db: Client

  constructor(db: Client) {
    this.db = db
  }

  // getCart ...
  getCart = async (id: string): Promise<TCart> => {
    try {
      const result = await this.db.query(getQuery(id), [])
      if (result.rows.length === 0) {
        throw new Error('no cart found')
      }

      if (result.rows[0].row_to_json === null) {
        throw new Error('no cart found')
      }
      return camelCaseObject(result.rows[0].row_to_json)
    } catch (err) {
      throw err
    }
  }

  // listCarts ...
  listCarts = async (): Promise<[TCart]> => {
    try {
      const result = await this.db.query(listQuery(), [])
      if (result.rows.length === 0) {
        throw new Error('no carts found')
      }

      if (result.rows[0].array_to_json === null) {
        throw new Error('no carts found')
      }
      return camelCaseObject(result.rows[0].array_to_json)
    } catch (err) {
      throw err
    }
  }

  // Create ...
  createCart = async (userId: string): Promise<TCart> => {
    const query =
      squel
        .insert()
        .into('carts')
        .set('user_id', userId)
        .toString() + ' RETURNING *'

    try {
      const result = await this.db.query(query, [])
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  // deleteCart ...
  deleteCart = async (id: string): Promise<TCart> => {
    const query =
      squel
        .update()
        .table('carts')
        .set('deleted_at', new Date().toISOString())
        .where('id = ?', id)
        .toString() + ' RETURNING *'

    try {
      const result = await this.db.query(query, [])
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  // addItem ...
  addItem = async (cartId: string, sku: string, quantity: number): Promise<TCartItem> => {
    const query =
      squel
        .insert()
        .into('carts_items')
        .set('cart_id', cartId)
        .set('sku', sku)
        .set('quantity', quantity)
        .toString() + ' RETURNING *'

    try {
      const result = await this.db.query(query, [])
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  // updateItemQuantity ...
  updateItemQuantity = async (cartId: string, sku: string, quantity: number): Promise<TCartItem> => {
    const query =
      squel
        .update()
        .table('carts_items')
        .set('quantity', quantity)
        .where(`cart_id = '${cartId}' AND sku = '${sku}'`)
        .toString() + ' RETURNING *'

    try {
      const result = await this.db.query(query, [])
      if (result.rows.length === 0) {
        throw new Error('item not found')
      }
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }

  // deleteItem ...
  deleteItem = async (cartId: string, sku: string): Promise<TCartItem> => {
    const query =
      squel
        .update()
        .table('carts_items')
        .set('deleted_at', new Date().toISOString())
        .where(`cart_id = '${cartId}' AND sku = '${sku}'`)
        .toString() + ' RETURNING *'

    try {
      const result = await this.db.query(query, [])
      return camelCaseObject(result.rows[0])
    } catch (err) {
      throw err
    }
  }
}

export default Cart
