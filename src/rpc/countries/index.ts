// node modules
import { Context } from 'mali'

// service
import Service from '../service'

// lib
import {
  TGetCartResponse,
  TListCartsResponse,
  TCreateCartResponse,
  TAddItemResponse,
  TUpdateItemQuantityResponse,
  TDeleteItemResponse,
  TDeleteCartResponse,
} from '../../../../lib/ts/types'

import { IRPC } from '../../../../lib/ts/interfaces'

class RPC implements IRPC {
  private service: Service

  constructor(service: Service) {
    this.service = service
  }

  getCart = async (ctx: Context, next: Function): Promise<void> => {
    const { id } = ctx.req
    if (id === undefined) {
      const res = <TGetCartResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing id param',
        },
      }
      ctx.res = res
      return
    }

    try {
      const cart = await this.service.getCart(id)
      const res = <TGetCartResponse>{
        data: cart,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TGetCartResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  listCarts = async (ctx: Context, next: Function): Promise<void> => {
    try {
      const carts = await this.service.listCarts()
      const res = <TListCartsResponse>{
        data: carts,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TListCartsResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  createCart = async (ctx: Context, next: Function): Promise<void> => {
    const { userId } = ctx.req
    if (userId === undefined) {
      const res = <TCreateCartResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing user_id param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const cart = await this.service.createCart(userId)
      const res = <TCreateCartResponse>{
        data: cart,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TCreateCartResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  addItem = async (ctx: Context, next: Function): Promise<void> => {
    const { cartId, sku, quantity } = ctx.req
    if (cartId === undefined) {
      const res = <TAddItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing cart_id param',
        },
      }

      ctx.res = res
      return
    }

    if (sku === undefined) {
      const res = <TAddItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing sku param',
        },
      }

      ctx.res = res
      return
    }

    if (quantity === undefined) {
      const res = <TAddItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing quantity param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const cart = await this.service.addItem(cartId, sku, quantity)
      const res = <TAddItemResponse>{
        data: cart,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TAddItemResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  updateItemQuantity = async (ctx: Context, next: Function): Promise<void> => {
    const { cartId, sku, quantity } = ctx.req
    if (cartId === undefined) {
      const res = <TUpdateItemQuantityResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing cart_id param',
        },
      }

      ctx.res = res
      return
    }

    if (sku === undefined) {
      const res = <TUpdateItemQuantityResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing sku param',
        },
      }

      ctx.res = res
      return
    }

    if (quantity === undefined) {
      const res = <TUpdateItemQuantityResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing quantity param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const cart = await this.service.updateItemQuantity(cartId, sku, quantity)
      const res = <TUpdateItemQuantityResponse>{
        data: cart,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TUpdateItemQuantityResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  deleteItem = async (ctx: Context, next: Function): Promise<void> => {
    const { cartId, sku } = ctx.req
    if (cartId === undefined) {
      const res = <TDeleteItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing cart_id param',
        },
      }

      ctx.res = res
      return
    }

    if (sku === undefined) {
      const res = <TDeleteItemResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing sku param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const cart = await this.service.deleteItem(cartId, sku)
      const res = <TDeleteItemResponse>{
        data: cart,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TDeleteItemResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }

  deleteCart = async (ctx: Context, next: Function): Promise<void> => {
    const { id } = ctx.req
    if (id === undefined) {
      const res = <TDeleteCartResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing cart_id param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const cart = await this.service.deleteCart(id)
      const res = <TDeleteCartResponse>{
        data: cart,
        error: null,
      }

      ctx.res = res
      return
    } catch (error) {
      const res = <TDeleteCartResponse>{
        data: null,
        error: {
          code: 500,
          message: error.message,
        },
      }

      ctx.res = res
      return
    }
  }
}

export default RPC
