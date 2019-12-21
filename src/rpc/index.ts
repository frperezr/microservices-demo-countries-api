// node modules
import { Context } from 'mali'

// service
import Service from '../service'

// lib
import {
  TGetCityResponse,
  TListCitiesResponse,
  TGetCountryResponse,
  TListCountriesResponse,
  TGetContinentResponse,
  TListContinentsResponse,
} from '../../../../lib/ts/types'

import { ICountriesRPC } from '../../../../lib/ts/interfaces'

class RPC implements ICountriesRPC {
  private service: Service

  constructor(service: Service) {
    this.service = service
  }

  getCity = async (ctx: Context, next: Function): Promise<void> => {
    const { id } = ctx.req
    if (id === undefined) {
      const res = <TGetCityResponse>{
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
      const city = await this.service.getCity(id)
      const res = <TGetCityResponse>{
        data: city,
        error: null,
      }

      ctx.res = res
      return
    } catch (err) {
      const res = <TGetCityResponse>{
        data: null,
        error: {
          code: 500,
          message: err.message,
        },
      }

      ctx.res = res
      return
    }
  }

  listCities = async (ctx: Context, next: Function): Promise<void> => {
    const { country } = ctx.req
    if (country === undefined) {
      const res = <TListCitiesResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing country param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const cities = await this.service.listCities(country)
      const res = <TListCitiesResponse>{
        data: cities,
        error: null,
      }

      ctx.res = res
      return
    } catch (err) {
      const res = <TListCitiesResponse>{
        data: null,
        error: {
          code: 500,
          message: err.message,
        },
      }

      ctx.res = res
      return
    }
  }

  getCountry = async (ctx: Context, next: Function): Promise<void> => {
    const { id } = ctx.req
    if (id === undefined) {
      const res = <TGetCountryResponse>{
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
      const country = await this.service.getCountry(id)
      const res = <TGetCountryResponse>{
        data: country,
        error: null,
      }

      ctx.res = res
      return
    } catch (err) {
      const res = <TGetCountryResponse>{
        data: null,
        error: {
          code: 500,
          message: err.message,
        },
      }

      ctx.res = res
      return
    }
  }

  listCountries = async (ctx: Context, next: Function): Promise<void> => {
    const { continent } = ctx.req
    if (continent === undefined) {
      const res = <TListCountriesResponse>{
        data: null,
        error: {
          code: 400,
          message: 'missing continent param',
        },
      }

      ctx.res = res
      return
    }

    try {
      const countries = await this.service.listCountries(continent)
      const res = <TListCountriesResponse>{
        data: countries,
        error: null,
      }

      ctx.res = res
      return
    } catch (err) {
      const res = <TListCountriesResponse>{
        data: null,
        error: {
          code: 500,
          message: err.message,
        },
      }

      ctx.res = res
      return
    }
  }

  getContinent = async (ctx: Context, next: Function): Promise<void> => {
    const { id } = ctx.req
    if (id === undefined) {
      const res = <TGetContinentResponse>{
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
      const continent = await this.service.getContinent(id)
      const res = <TGetContinentResponse>{
        data: continent,
        error: null,
      }

      ctx.res = res
      return
    } catch (err) {
      const res = <TGetContinentResponse>{
        data: null,
        error: {
          code: 500,
          message: err.message,
        },
      }

      ctx.res = res
      return
    }
  }

  listContinents = async (ctx: Context, next: Function): Promise<void> => {
    try {
      const continents = await this.service.listContinents()
      const res = <TListContinentsResponse>{
        data: continents,
        error: null,
      }

      ctx.res = res
      return
    } catch (err) {
      const res = <TListContinentsResponse>{
        data: null,
        error: {
          code: 500,
          message: err.message,
        },
      }

      ctx.res = res
      return
    }
  }
}

export default RPC
