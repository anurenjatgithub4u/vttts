import React, { Fragment, useEffect, useState } from 'react'
import { View } from 'react-native';
import { useDisclose } from 'native-base'
import { ActivityIndicator } from 'react-native'
import { useHeader } from '../../ApiHeader';
import SosList from './Helper/SosList';
import SosListCount from './Helper/SosListCount';
import SosFilterComponent from './Helper/SosFilterComponent';
import { useNavigation } from '@react-navigation/native';

const Sos = ({ statusSearch, setStatusSearch, }) => {
  const navigation = useNavigation();
  const { ApiRequestAuthorizationHook } = useHeader();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isFilter, setIsFilter] = useState(false);
  let { isOpen, onOpen, onClose } = useDisclose()

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const [sosData, setSosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [sosDataCount, setSosDataCount] = useState(0);

  const [searchpage, setSearchPage] = useState(1);
  const [searchtotalPage, setSearchTotalPage] = useState(0);
  const [searchsosData, setSearchSosData] = useState([]);
  const [searchloading, setSearchLoading] = useState(true);
  const [searchloadMore, setSearchLoadMore] = useState(false);
  const [searchsosDataCount, setSearchSosDataCount] = useState(0);
  const [filterValue, setFilterValue] = useState({
    Status: 'All',
    FromDate: '',
    searchName: '',
  });

  const onSearchData = () => {
    setSearchLoading(true)
    setIsFilter(true);
    setSearchPage(1);
    setSearchSosData([]);
    fetchData();
    setStatusSearch({ ...statusSearch, search: '' })
    onClose();
  }

  // console.log(`/sos_services?${filterValue?.Status === "All" ? '' : 'status=' + filterValue?.Status + "&"}${'from=' + fromDate?.toISOString() + "&" + 'to=' + toDate?.toISOString() + "&"}currentPage=${searchpage}&pageSize=${15}&${filterValue?.searchName === "" ? '' : 'search_key=' + filterValue?.searchName + "&"}`)

  const fetchData = async () => {
    await ApiRequestAuthorizationHook.get(`/sos_services?${filterValue?.Status === "All" ? '' : 'status=' + filterValue?.Status + "&"}${'from=' + fromDate?.toISOString() + "&" + 'to=' + toDate?.toISOString() + "&"}currentPage=${searchpage}&pageSize=${15}&${filterValue?.searchName === "" ? '' : 'search_key=' + filterValue?.searchName + "&"}`)
      .then(function (response) {
        if (response.status === 200) {
          setSearchSosData(oldArray => [...oldArray, ...response.data.data]);
          setSearchSosDataCount(response?.data?.noRecords)
          setSearchTotalPage(response.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setSearchLoading(false)
      });

  }

  useEffect(() => {
    if (isFilter === true) {
      fetchData();
    }
  }, [searchpage, isFilter])

  const fetchSearchMoreData = () => {
    setSearchLoadMore(true)
    if (searchtotalPage != searchpage) {
      setSearchPage(searchpage + 1)
    } else {
      setSearchLoadMore(false)
    }
  }

  const newSosSearchList = Array.from(new Set(searchsosData?.map(a => a?.id)))
    .map(id => {
      return searchsosData?.find(a => a?.id === id)
    })

  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  const fetchDataSos = async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    await ApiRequestAuthorizationHook.get(`/sos_services?${statusSearch?.search === "" ? '' : `status=${statusSearch?.search}&from=${new Date(d)?.toISOString()}&to=${new Date()?.toISOString()}&`}currentPage=${page}&pageSize=${15}`, { signal: signal })
      .then(function (response) {
        if (response.status === 200) {
          setSosData(oldArray => [...oldArray, ...response.data.data]);
          setSosDataCount(response?.data?.noRecords)
          setTotalPage(response.data.totalPage);
        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
        // setError(error)
      })
      .finally(function () {
        setLoading(false)
      });

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    fetchDataSos();
  }, [page, statusSearch])

  const fetchMoreData = () => {
    setLoadMore(true)
    if (totalPage != page) {
      setPage(page + 1)
    } else {
      setLoadMore(false)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true)
      setPage(1)
      setSosDataCount(0)
      setSosData([])
      fetchDataSos();
    });
    return unsubscribe;
  }, [navigation]);

  const newSosList = Array.from(new Set(sosData?.map(a => a?.id)))
    .map(id => {
      return sosData?.find(a => a?.id === id)
    })

  return (
    <Fragment>
      {isFilter === true ?
        <View>
          <SosListCount searchsosDataCount={searchsosDataCount} />
          {searchloading ?
            <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 30, paddingBottom: 30 }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <SosList searchloadMore={searchloadMore} fetchSearchMoreData={fetchSearchMoreData} newSosSearchList={newSosSearchList} />
          }
        </View >
        :
        <View>
          <SosListCount searchsosDataCount={sosDataCount} />
          {loading ?
            <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', paddingTop: 30, paddingBottom: 30 }}>
              <ActivityIndicator color={'#63CE78'} size={'large'} />
            </View>
            :
            <SosList searchloadMore={loadMore} fetchSearchMoreData={fetchMoreData} newSosSearchList={newSosList} />
          }
        </View>
      }

      <SosFilterComponent
        setFromDate={setFromDate}
        fromDate={fromDate}
        setToDate={setToDate}
        toDate={toDate}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        // onClear={onClear}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        onSearchData={onSearchData}


        setIsFilter={setIsFilter}
        setSearchPage={setSearchPage}
        setSearchSosData={setSearchSosData}
        fetchData={fetchData}
        setStatusSearch={setStatusSearch}
      />
    </Fragment>
  )
}

export default Sos