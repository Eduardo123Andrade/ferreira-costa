import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  MutationStatus,
} from "react-query"
import { AxiosError, AxiosResponse } from "axios"
import { useAPI } from "./useApi"
import { RequestError } from "../interfaces/RequestError"

export type UsePostRequestStatus = MutationStatus

export interface UsePostRequestOptionsType<TData, TVariables>
  extends UseMutationOptions<
    AxiosResponse<TData>,
    AxiosError<RequestError>,
    TVariables,
    any
  > {}

export const usePostRequest = <TData = any, TVariables = any>(
  url: string,
  options?: UsePostRequestOptionsType<TData, TVariables>
) => {
  const { API } = useAPI()

  const mutationFunction: MutationFunction<AxiosResponse<TData>, TVariables> = (
    data
  ) => API.post(url, data)

  return useMutation<
    AxiosResponse<TData>,
    AxiosError<RequestError>,
    TVariables,
    any
  >(mutationFunction, options)
}
