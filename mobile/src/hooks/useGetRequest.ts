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

export type UseGetRequestStatus = MutationStatus

export type UseGetRequest<TData = any> = UseQueryResult<
  AxiosResponse<TData>,
  AxiosError<RequestError>
>

export interface UseGetRequestConfigs extends AxiosRequestConfig {}

export interface UseGetRequestOptions<TData = any>
  extends UseQueryOptions<AxiosResponse<TData>, AxiosError<RequestError>> {}

export const useGetRequest = <TData = any>(
  url: string,
  options?: QueryObserverOptions<
    AxiosResponse<TData, RequestError>,
    RequestError,
    AxiosResponse<TData, RequestError>
  >,
  configs?: UseGetRequestConfigs
): UseGetRequest<TData> => {
  const { API } = useAPI()

  const queryArgs = useQuery<AxiosResponse<TData, RequestError>, any>({
    ...options,
    queryKey: [url, configs],
    queryFn: () => API.get(url, configs),
  })

  return queryArgs
}
