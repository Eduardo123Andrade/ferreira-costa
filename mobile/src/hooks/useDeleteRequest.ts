import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  MutationStatus,
  QueryObserverOptions,
} from "react-query"
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"
import { useAPI } from "./useApi"
import { RequestError } from "../interfaces/RequestError"

export type UseDeleteRequestStatus = MutationStatus

export type UseDeleteRequest<TData = any> = UseQueryResult<
  AxiosResponse<TData>,
  AxiosError<RequestError>
>

export type UseDeleteRequestConfigs = AxiosRequestConfig
export type UseDeleteRequestOptions<TData = any> = UseQueryOptions<
  AxiosResponse<TData>,
  AxiosError<RequestError>
>

export const useDeleteRequest = <TData = any>(
  url: string,
  options?: QueryObserverOptions<
    AxiosResponse<TData, RequestError>,
    RequestError,
    AxiosResponse<TData, RequestError>
  >,
  configs?: UseDeleteRequestConfigs
): UseDeleteRequest<TData> => {
  const { API } = useAPI()

  const queryArgs = useQuery<AxiosResponse<TData, RequestError>, any>({
    ...options,
    queryKey: [url, configs],
    queryFn: () => API.delete(url, configs),
  })

  return queryArgs
}
