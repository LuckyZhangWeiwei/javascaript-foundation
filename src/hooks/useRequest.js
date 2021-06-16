import axios from "axios";
import { useState, useEffect } from "react";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYWtlVXNlcklkIiwibmJmIjoxNjIxOTk0MDQ3LCJleHAiOjE2MjIwODA0NDcsImlzcyI6ImZha2V4aWVjaGVuZy5jb20iLCJhdWQiOiJmYWtleGllY2hlbmcuY29tIn0.DC6L3-mBba6-b4Rmv3gY7d_L3Pm0j_nm4AgOLj8gZjI";
axios.defaults.baseURL = "http://172.28.137.187:8045/";
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

function useRequest(option) {
  let [data, setData] = useState({
    list: [],
  });

  useEffect(() => {
    axios
      .get(
        `api/ItRequestDemand?pageSize=100&&pageNumber=${option.pageNumber}&orderby=requestDatetime desc, requestDemandId asc&fields=RequestDemandId,DemandTitle`
      )
      .then((response) => {
        setData(response.data);
      });
  }, [option]);

  return [data];
}

export default useRequest;
