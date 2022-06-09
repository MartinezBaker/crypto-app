import React, {useState, useEffect} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { LineChart, BarChart } from 'components/Charts'
import { setSortIcon } from 'utils/FontAwesomeutil'
import { sortList, getTodaysDate, formatChartData, topSort, formatNum } from 'utils/functionUtils'
import { marketDaysArr } from 'utils/arrayUtils';
import { CoinInstance, Button } from "components";
import { TableContainer, TableHeader, Table, TableRow, SortButton,  LineChartContainer, BarChartContainer, ChartParent, PriceText, SubText, TextContainer, ParentDiv, MarketDaysParent, TitleParent, TitleChild, TableTitleContainer, TableTitle1, TableTitle2, TableParent } from './styles';
import { StyledMessage } from 'components/Charts/styles';

const Coins = (props) => {
  const [coins, setCoins] = useState(null)
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [chartData, setChartData] = useState(null);
  const [marketDays, setMarketDays] = useState(29);
  const [sortBy, setSortBy] = useState("BY MARKET CAP");
  const [sort, setSort] = useState({
    sortName: null,
    current_price: null,
    price_change_percentage_1h_in_currency: null,
    price_change_percentage_24h_in_currency: null,
    price_change_percentage_7d_in_currency: null,
  });
  
  const getCoins = async () => {
    try {
      setLoading(true)
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${props.currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      setCoins(data)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError(true)
      setErrorMessage("There was a problem getting coin list!");
    }
  };
  const getMoreCoins = async () => {
    try {
      const nextPage = page + 1;
      setPage(nextPage)
      setLoading(true)
      const { data } = await axios(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${props.currency}&order=market_cap_desc&per_page=50&page=${nextPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
      );
      if (!data.length) {
        setHasMore(false)
      }
      const addCoins = [...coins, ...data];
      setCoins(addCoins)
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError(true)
      setErrorMessage("Could not load more coins!");
    }
  };
  const getChartData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${props.currency}&days=${marketDays}&interval=daily`
      );
      setLoading(false)
      setChartData(data)
    } catch (error) {
      setLoading(false);
      setError(true)
      setErrorMessage("Could Not Load Chart Data!");
    }
  };
  const handleTopSortClick = () => {
    const newSort = Object.entries(sort)
      .map((entry) => {
        const [key] = entry;
        return {
          [key]: null,
        };
      })
      .reduce((acc, element) => ({ ...acc, ...element }), {});
    setSort(newSort)
    if (sortBy === "BY MARKET CAP") {
      setSortBy("BY VOLUME")
    } else {
      setSortBy("BY MARKET CAP")
    }
  };
  const handleSort = (sortType) => {
    setSortBy("BY MARKET CAP");
    const newSort = Object.entries(sort)
      .map((entry) => {
        const [key, value] = entry;
        if (key === sortType) {
          return {
            [key]: value !== true,
          };
        } else {
          return {
            [key]: null,
          };
        }
      })
      .reduce((acc, element) => ({ ...acc, ...element }), {});
    setSort(newSort)
  };
  const handleClick = (name) => {
    const marketDaysObj = {
      "1d": 1,
      "1w": 6,
      "1m": 29,
      "3m": 89,
      "6m": 179,
      "1y": 364,
    };
    Object.entries(marketDaysObj).map((entry) => {
      const [key] = entry;
      if (key === name) {
        return setMarketDays(marketDaysObj[name]);
      } else {
        return null;
      }
    });
  };
  useEffect(() => {
    getCoins();
    getChartData();
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    getChartData()
  }, [marketDays])
  useEffect(() => {
    getCoins()
    getChartData()
  },[props.currency])
  const lineChartLabels =
    chartData?.prices && formatChartData(chartData.prices, 0);
  const lineChartData =
    chartData?.prices && formatChartData(chartData.prices, 1);
  const barChartLabels =
    chartData?.total_volumes &&
    formatChartData(chartData.total_volumes, 0);
  const barChartData =
    chartData?.total_volumes && formatChartData(chartData.total_volumes, 1);
  let coinList = [...(coins ? coins : [])];
  coinList = coinList?.sort(topSort(sortBy, "BY MARKET CAP", "market_cap"));
  coinList = coinList?.sort(topSort(sortBy, "BY VOLUME", "total_volume"));
  coinList = coinList?.sort(sortList(sort.sortName, "name"));
  coinList = coinList?.sort(sortList(sort.current_price, "current_price"));
  coinList = coinList?.sort(
    sortList(
      sort?.price_change_percentage_1h_in_currency,
      "price_change_percentage_1h_in_currency"
    )
  );
  coinList = coinList?.sort(
    sortList(
      sort?.price_change_percentage_24h_in_currency,
      "price_change_percentage_24h_in_currency"
    )
  );
  coinList = coinList?.sort(
    sortList(
      sort?.price_change_percentage_7d_in_currency,
      "price_change_percentage_7d_in_currency"
    )
  );
  return (
    <ParentDiv>
      <TitleParent>
        <TitleChild>Overview</TitleChild>
      </TitleParent>
      <ChartParent>
        <LineChartContainer>
          {loading || error ? (
            <div></div>
          ) : (
            <TextContainer>
              <SubText>BTC Price</SubText>
              <PriceText>
                {lineChartData &&
                  props.symbol +
                    formatNum(lineChartData[lineChartData.length - 1])}
              </PriceText>
              <SubText>{getTodaysDate()}</SubText>
            </TextContainer>
          )}
          <LineChart
            labels={lineChartLabels}
            data={lineChartData}
            priceTimeArry={chartData?.prices}
            errMessage={errorMessage}
            isLoading={loading}
            hasError={error}
            currSymbol={props.symbol}
            darkMode={props.darkMode}
          />
        </LineChartContainer>
        <BarChartContainer>
          {loading || error ? (
            <div></div>
          ) : (
            <TextContainer>
              <SubText>BTC Volume 24h</SubText>
              <PriceText>
                {barChartData &&
                  props.symbol +
                    formatNum(barChartData[barChartData.length - 1])}
              </PriceText>
              <SubText>{getTodaysDate()}</SubText>
            </TextContainer>
          )}
          <BarChart
            days={marketDays}
            labels={barChartLabels}
            data={barChartData}
            volTimeArry={chartData?.total_volumes}
            errMessage={errorMessage}
            isLoading={loading}
            hasError={error}
            currSymbol={props.symbol}
            darkMode={props.darkMode}
          />
        </BarChartContainer>
      </ChartParent>
      <MarketDaysParent>
        {marketDaysArr.map((days) => (
          <Button
            key={days.name}
            name={days.name}
            active={marketDays === days.numDays}
            handleClick={handleClick}
          />
        ))}
      </MarketDaysParent>
      <TableParent>
        <TableContainer>
          <TableTitleContainer>
            <TableTitle1>TOP {coins?.length}</TableTitle1>
            <TableTitle2>{sortBy}</TableTitle2>
            <SortButton onClick={handleTopSortClick}>
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ marginLeft: "5px" }}
              />
            </SortButton>
          </TableTitleContainer>
          <InfiniteScroll
            dataLength={coinList?.length}
            next={getMoreCoins}
            hasMore={hasMore}
            loader={
              (loading && <StyledMessage>Loading...</StyledMessage>) || (
                <StyledMessage>{errorMessage}</StyledMessage>
              )
            }
          >
            {coinList.length ? (
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>#</TableHeader>
                    <TableHeader>
                      Name
                      <SortButton onClick={() => handleSort("sortName")}>
                        {setSortIcon(sort.sortName)}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      Price
                      <SortButton onClick={() => handleSort("current_price")}>
                        {setSortIcon(sort.current_price)}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      1h%
                      <SortButton
                        onClick={() =>
                          handleSort("price_change_percentage_1h_in_currency")
                        }
                      >
                        {setSortIcon(
                          sort.price_change_percentage_1h_in_currency
                        )}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      24h%
                      <SortButton
                        onClick={() =>
                          handleSort("price_change_percentage_24h_in_currency")
                        }
                      >
                        {setSortIcon(
                          sort.price_change_percentage_24h_in_currency
                        )}
                      </SortButton>
                    </TableHeader>
                    <TableHeader darkMode={props.darkMode}>
                      7d%
                      <SortButton
                        onClick={() =>
                          handleSort("price_change_percentage_7d_in_currency")
                        }
                      >
                        {setSortIcon(
                          sort.price_change_percentage_7d_in_currency
                        )}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>24h Vol/Market Cap</TableHeader>
                    <TableHeader>Circulating/Total Sup</TableHeader>
                    <TableHeader>Last 7d</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {coinList.map((coin) => (
                    <CoinInstance
                      key={coin.id}
                      id={coin.id}
                      name={coin.name}
                      price={
                        coin.current_price < 1e3
                          ? coin.current_price.toString()
                          : coin.current_price.toLocaleString()
                      }
                      image={coin.image}
                      symbol={coin.symbol.toUpperCase()}
                      oneHour={coin.price_change_percentage_1h_in_currency?.toString()}
                      twentyFourHour={coin.price_change_percentage_24h_in_currency?.toString()}
                      sevenDay={coin.price_change_percentage_7d_in_currency?.toString()}
                      totalVolume={coin.total_volume}
                      marketCap={coin.market_cap.toString()}
                      totalVolPercentage={
                        (coin.total_volume / coin.market_cap) * 100
                      }
                      circulatingSupply={coin.circulating_supply}
                      totalSupply={coin.total_supply}
                      circulatingSupplyPercentage={
                        (coin.circulating_supply / coin.total_supply) * 100
                      }
                      sparkLine={coin.sparkline_in_7d}
                      currSymbol={props.symbol}
                      currency={props.currency}
                      darkMode={props.darkMode}
                    />
                  ))}
                </tbody>
              </Table>
            ) : (
              <StyledMessage>{errorMessage}</StyledMessage>
            )}
          </InfiniteScroll>
        </TableContainer>
      </TableParent>
    </ParentDiv>
  );
}

export default Coins;