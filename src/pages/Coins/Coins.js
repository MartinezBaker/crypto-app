import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import MoonLoader from "react-spinners/MoonLoader";
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom';
import {
  getCoins,
  getChartData,
  getMoreCoins,
  sortAtTop,
  sortItems,
} from "../../store/Coins/actions";
import { changePath } from 'store/Main/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { LineChart, BarChart } from 'components/Charts'
import { setSortIcon } from 'utils/FontAwesomeutil'
import { sortList, getTodaysDate, formatChartData, topSort, formatNum } from 'utils/functionUtils'
import { marketDaysArr } from 'utils/arrayUtils';
import { CoinInstance, Button } from "components";
import { TableContainer, TableHeader, LastSevenDayTableHeader, ProgressBarTableHeader, PercentageTableHeader, Table, TableRow, SortButton,  LineChartContainer, BarChartContainer, ChartParent, PriceText, SubText, TextContainer, ParentDiv, MarketDaysParent, TitleParent, TitleChild, TableTitleContainer, TableTitle1, TableTitle2, TableParent, StyledLoader } from './styles';
import { StyledMessage } from 'components/Charts/styles';

const Coins = ({main, getChartData, getCoins, coins, getMoreCoins, sortItems, sortAtTop, changePath}) => {
  const [isScreen, setScreen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    if(location.pathname === "/coins"){
      changePath(location.pathname);
    }
  }, [location, changePath]);
  useEffect(() => {
    if(window.innerWidth > 1020){
      setScreen(true)
    } else {
      setScreen(false);
    }
    const updateMedia = () => {
      if (window.innerWidth > 1020) {
        setScreen(true);
      } else {
        setScreen(false);
      }
    };
    window.addEventListener("resize", updateMedia)
    return () => window.removeEventListener("resize", updateMedia)
    //eslint-disable-next-line
  }, [])
  useEffect(() => {
    getCoins();
  },[main.currentCurrency, getCoins])
  useEffect(() => {
    getChartData();
  }, [getChartData, coins.marketDays, main.currentCurrency]);
  const chartData = coins.chartData
  const lineChartLabels =
    chartData?.prices && formatChartData(chartData.prices, 0);
  const lineChartData =
    chartData?.prices && formatChartData(chartData.prices, 1);
  const barChartLabels =
    chartData?.total_volumes &&
    formatChartData(chartData.total_volumes, 0);
  const barChartData =
    chartData?.total_volumes && formatChartData(chartData.total_volumes, 1);
  const coinsArry = coins.coins
  let coinList = [...(coinsArry ? coinsArry : [])];
  coinList = coinList?.sort(topSort(coins.sortBy, "BY MARKET CAP", "market_cap"));
  coinList = coinList?.sort(
    topSort(coins.sortBy, "BY VOLUME", "total_volume")
  );
  coinList = coinList?.sort(sortList(coins.sort.sortName, "name"));
  coinList = coinList?.sort(
    sortList(coins.sort.current_price, "current_price")
  );
  coinList = coinList?.sort(
    sortList(
      coins.sort.price_change_percentage_1h_in_currency,
      "price_change_percentage_1h_in_currency"
    )
  );
  coinList = coinList?.sort(
    sortList(
      coins.sort.price_change_percentage_24h_in_currency,
      "price_change_percentage_24h_in_currency"
    )
  );
  coinList = coinList?.sort(
    sortList(
      coins.sort.price_change_percentage_7d_in_currency,
      "price_change_percentage_7d_in_currency"
    )
  );
  return (
    <ParentDiv>
      <TitleParent>
        <TitleChild>Overview:</TitleChild>
      </TitleParent>
      {isScreen ? (
        <ChartParent>
          <LineChartContainer>
            {coins.loading ? (
              <StyledLoader>
                <MoonLoader loading={coins.loading} color={"rgb(0, 252, 42)"} />
              </StyledLoader>
            ) : (
              <TextContainer>
                <SubText>BTC Price</SubText>
                <PriceText>
                  {lineChartData &&
                    main.symbol +
                      formatNum(lineChartData[lineChartData.length - 1])}
                </PriceText>
                <SubText>{getTodaysDate()}</SubText>
              </TextContainer>
            )}
            <LineChart labels={lineChartLabels} data={lineChartData} />
          </LineChartContainer>
          <BarChartContainer>
            {coins.loading ? (
              <StyledLoader>
                <MoonLoader loading={coins.loading} color={"rgb(0, 252, 42)"} />
              </StyledLoader>
            ) : (
              <TextContainer>
                <SubText>BTC Volume 24h</SubText>
                <PriceText>
                  {barChartData &&
                    main.symbol +
                      formatNum(barChartData[barChartData.length - 1])}
                </PriceText>
                <SubText>{getTodaysDate()}</SubText>
              </TextContainer>
            )}
            <BarChart labels={barChartLabels} data={barChartData} />
          </BarChartContainer>
        </ChartParent>
      ) : (
        <Carousel showThumbs={false}>
          <LineChartContainer active="active">
            {coins.loading ? (
              <StyledLoader>
                <MoonLoader loading={coins.loading} color={"rgb(0, 252, 42)"} />
              </StyledLoader>
            ) : (
              <TextContainer>
                <SubText>BTC Price</SubText>
                <PriceText>
                  {lineChartData &&
                    main.symbol +
                      formatNum(lineChartData[lineChartData.length - 1])}
                </PriceText>
                <SubText>{getTodaysDate()}</SubText>
              </TextContainer>
            )}
            <LineChart labels={lineChartLabels} data={lineChartData} />
          </LineChartContainer>
          <BarChartContainer active="active">
            {coins.loading ? (
              <MoonLoader loading={coins.loading} color={"rgb(0, 252, 42)"} />
            ) : (
              <TextContainer>
                <SubText>BTC Volume 24h</SubText>
                <PriceText>
                  {barChartData &&
                    main.symbol +
                      formatNum(barChartData[barChartData.length - 1])}
                </PriceText>
                <SubText>{getTodaysDate()}</SubText>
              </TextContainer>
            )}
            <BarChart labels={barChartLabels} data={barChartData} />
          </BarChartContainer>
        </Carousel>
      )}
      <MarketDaysParent>
        {marketDaysArr.map((days) => (
          <Button
            key={days.name}
            name={days.name}
            active={coins.marketDays === days.numDays}
          />
        ))}
      </MarketDaysParent>
      <TableParent>
        <TableContainer>
          <TableTitleContainer>
            <TableTitle1>TOP {coinsArry.length}</TableTitle1>
            <TableTitle2>{coins.sortBy}</TableTitle2>
            <SortButton onClick={() => sortAtTop()}>
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ marginLeft: "5px" }}
              />
            </SortButton>
          </TableTitleContainer>
          <InfiniteScroll
            dataLength={coinList?.length}
            next={() => getMoreCoins(coins.page + 1)}
            hasMore={coins.hasMore}
            loader={
              <div>Loading...</div>
            }
          >
            {coinList.length ? (
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>#</TableHeader>
                    <TableHeader>
                      Name
                      <SortButton onClick={() => sortItems("sortName")}>
                        {setSortIcon(coins.sort.sortName)}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      Price
                      <SortButton onClick={() => sortItems("current_price")}>
                        {setSortIcon(coins.sort.current_price)}
                      </SortButton>
                    </TableHeader>
                    <PercentageTableHeader>
                      1h%
                      <SortButton
                        onClick={() =>
                          sortItems("price_change_percentage_1h_in_currency")
                        }
                      >
                        {setSortIcon(
                          coins.sort.price_change_percentage_1h_in_currency
                        )}
                      </SortButton>
                    </PercentageTableHeader>
                    <PercentageTableHeader>
                      24h%
                      <SortButton
                        onClick={() =>
                          sortItems("price_change_percentage_24h_in_currency")
                        }
                      >
                        {setSortIcon(
                          coins.sort.price_change_percentage_24h_in_currency
                        )}
                      </SortButton>
                    </PercentageTableHeader>
                    <PercentageTableHeader>
                      7d%
                      <SortButton
                        onClick={() =>
                          sortItems("price_change_percentage_7d_in_currency")
                        }
                      >
                        {setSortIcon(
                          coins.sort.price_change_percentage_7d_in_currency
                        )}
                      </SortButton>
                    </PercentageTableHeader>
                    <ProgressBarTableHeader>
                      24h Vol/Market Cap
                    </ProgressBarTableHeader>
                    <ProgressBarTableHeader>
                      Circulating/Total Sup
                    </ProgressBarTableHeader>
                    <LastSevenDayTableHeader>Last 7d</LastSevenDayTableHeader>
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
                      oneHour={coin.price_change_percentage_1h_in_currency?.toFixed(
                        2
                      )}
                      twentyFourHour={coin.price_change_percentage_24h_in_currency?.toFixed(
                        2
                      )}
                      sevenDay={coin.price_change_percentage_7d_in_currency?.toFixed(
                        2
                      )}
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
                    />
                  ))}
                </tbody>
              </Table>
            ) : (
              <StyledMessage>{coins.errorMessage}</StyledMessage>
            )}
          </InfiniteScroll>
        </TableContainer>
      </TableParent>
    </ParentDiv>
  );
}
const mapStateToProps = (state) => ({
  coins: state.coins,
  main: state.main
})
const mapDispatchToProps = (dispatch) => {
    return {
      sortAtTop: () => dispatch(sortAtTop()),
      sortItems: (sortType) => dispatch(sortItems(sortType)),
      getChartData: () => dispatch(getChartData()),
      getCoins: () => dispatch(getCoins()),
      getMoreCoins: (page) => dispatch(getMoreCoins(page)),
      changePath: (path) => dispatch(changePath(path))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Coins);