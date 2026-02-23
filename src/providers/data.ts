import {
  createDataProvider,
  CreateDataProviderOptions,
} from "@refinedev/rest";

import { BACKEND_BASE_URL } from "@/constants";
import { ListResponse } from "@/Types";
import {HttpError} from "@refinedev/core";


const buildHttpError = async ( response:Response ) : Promise<HttpError>=> {
  let message = 'Request failed.';
  try {
    const payload = (await response.json()) as { message?: string };
    if(payload?.message) message = payload.message;

  }catch {
    // ignore errors
  }
  return {
    message,
    statusCode: response.status,
  };
}

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,

    // Convert refine pagination/filters -> backend query params
    buildQueryParams: async ({ resource, pagination, filters }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;

      // base params used by your Express API
      const params: Record<string, string | number> = {
        page,
        limit: pageSize,
      };



      filters?.forEach((filter) => {
        // guard because refine filter type is a union
        const field = "field" in filter ? String(filter.field) : "";
        const value = String(filter.value ?? "");

        if (!field || !value) return;

        if (resource === "subjects") {
          if (field === "department") params.department = value;

          // You treat name/code as a single "search" query param
          if (field === "name" || field === "code") params.search = value;
        }
      });

      return params;
    },

    mapResponse: async (response) => {
      if(!response.ok) throw await buildHttpError(response);
      const payload: ListResponse = await response.json();
      return payload.data ?? [];
    },

    getTotalCount: async (response) => {
      if(!response.ok) throw await buildHttpError(response);
      const payload: ListResponse = await response.json();

      return (
          payload.pagination?.total ??
          payload.data?.length ??
          0
      );
    },
  },
};

const { dataProvider } =
    createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };