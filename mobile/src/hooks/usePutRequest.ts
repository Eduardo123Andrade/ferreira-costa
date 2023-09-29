import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  MutationStatus,
} from "react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useAPI } from "./useApi"
import { RequestError } from "interfaces"

export type UsePutRequestStatus = MutationStatus

export type UsePutRequestOptionsType<TData, TVariables> = UseMutationOptions<
  AxiosResponse<TData>,
  AxiosError<RequestError>,
  TVariables,
  any
>

export const usePutRequest = <TData = any, TVariables = any>(
  url: string,
  options?: UsePutRequestOptionsType<TData, TVariables>
) => {
  const { API } = useAPI()

  const mutationFunction: MutationFunction<AxiosResponse<TData>, TVariables> = (
    data
  ) => API.put(url, data)

  return useMutation<
    AxiosResponse<TData>,
    AxiosError<RequestError>,
    TVariables,
    any
  >(mutationFunction, options)
}
