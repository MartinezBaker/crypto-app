import React, { useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import {
  getCoins,
  getChartData,
  getMoreCoins,
  sortAtTop,
  sortItems,
} from "../../store/Coins/actions";
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
  useEffect(() => {
    props.getCoins();
    props.getChartData();
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    props.getChartData();
  }, [props.coins.marketDays])
  useEffect(() => {
    props.getCoins();
    props.getChartData();
  },[props.main.currentCurrency])
  const chartData = props.coins.chartData
  const lineChartLabels =
    chartData?.prices && formatChartData(chartData.prices, 0);
  const lineChartData =
    chartData?.prices && formatChartData(chartData.prices, 1);
  const barChartLabels =
    chartData?.total_volumes &&
    formatChartData(chartData.total_volumes, 0);
  const barChartData =
    chartData?.total_volumes && formatChartData(chartData.total_volumes, 1);
  const coins = props.coins.coins
  let coinList = [...(coins ? coins : [])];
  coinList = coinList?.sort(topSort(props.coins.sortBy, "BY MARKET CAP", "market_cap"));
  coinList = coinList?.sort(
    topSort(props.coins.sortBy, "BY VOLUME", "total_volume")
  );
  coinList = coinList?.sort(sortList(props.coins.sort.sortName, "name"));
  coinList = coinList?.sort(
    sortList(props.coins.sort.current_price, "current_price")
  );
  coinList = coinList?.sort(
    sortList(
      props.coins.sort.price_change_percentage_1h_in_currency,
      "price_change_percentage_1h_in_currency"
    )
  );
  coinList = coinList?.sort(
    sortList(
      props.coins.sort.price_change_percentage_24h_in_currency,
      "price_change_percentage_24h_in_currency"
    )
  );
  coinList = coinList?.sort(
    sortList(
      props.coins.sort.price_change_percentage_7d_in_currency,
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
          {props.coins.loading || props.coins.error ? (
            <div></div>
          ) : (
            <TextContainer>
              <SubText>BTC Price</SubText>
              <PriceText>
                {lineChartData &&
                  props.main.symbol +
                    formatNum(lineChartData[lineChartData.length - 1])}
              </PriceText>
              <SubText>{getTodaysDate()}</SubText>
            </TextContainer>
          )}
          <LineChart
            labels={lineChartLabels}
            data={lineChartData}
            priceTimeArry={chartData?.prices}
            errMessage={props.coins.errorMessage}
            isLoading={props.coins.loading}
            hasError={props.coins.error}
            currSymbol={props.main.symbol}
            darkMode={props.main.darkMode}
          />
        </LineChartContainer>
        <BarChartContainer>
          {props.coins.loading || props.coins.error ? (
            <div></div>
          ) : (
            <TextContainer>
              <SubText>BTC Volume 24h</SubText>
              <PriceText>
                {barChartData &&
                  props.main.symbol +
                    formatNum(barChartData[barChartData.length - 1])}
              </PriceText>
              <SubText>{getTodaysDate()}</SubText>
            </TextContainer>
          )}
          <BarChart
            days={props.coins.marketDays}
            labels={barChartLabels}
            data={barChartData}
            volTimeArry={chartData?.total_volumes}
            errMessage={props.coins.errorMessage}
            isLoading={props.coins.loading}
            hasError={props.coins.error}
            currSymbol={props.main.symbol}
            darkMode={props.main.darkMode}
          />
        </BarChartContainer>
      </ChartParent>
      <MarketDaysParent>
        {marketDaysArr.map((days) => (
          <Button
            key={days.name}
            name={days.name}
            active={props.coins.marketDays === days.numDays}
          />
        ))}
      </MarketDaysParent>
      <TableParent>
        <TableContainer>
          <TableTitleContainer>
            <TableTitle1>TOP {coins?.length}</TableTitle1>
            <TableTitle2>{props.coins.sortBy}</TableTitle2>
            <SortButton onClick={() => props.sortAtTop()}>
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ marginLeft: "5px" }}
              />
            </SortButton>
          </TableTitleContainer>
          <InfiniteScroll
            dataLength={coinList?.length}
            next={getMoreCoins()} //not finished with this
            hasMore={props.coins.hasMore}
            loader={
              (props.coins.loading && (
                <StyledMessage>Loading...</StyledMessage>
              )) || <StyledMessage>{props.coins.errorMessage}</StyledMessage>
            }
          >
            {coinList.length ? (
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>#</TableHeader>
                    <TableHeader>
                      Name
                      <SortButton onClick={() => props.sortItems("sortName")}>
                        {setSortIcon(props.coins.sort.sortName)}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      Price
                      <SortButton onClick={() => props.sortItems("current_price")}>
                        {setSortIcon(props.coins.sort.current_price)}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      1h%
                      <SortButton
                        onClick={() =>
                          props.sortItems("price_change_percentage_1h_in_currency")
                        }
                      >
                        {setSortIcon(
                          props.coins.sort
                            .price_change_percentage_1h_in_currency
                        )}
                      </SortButton>
                    </TableHeader>
                    <TableHeader>
                      24h%
                      <SortButton
                        onClick={() =>
                          props.sortItems("price_change_percentage_24h_in_currency")
                        }
                      >
                        {setSortIcon(
                          props.coins.sort
                            .price_change_percentage_24h_in_currency
                        )}
                      </SortButton>
                    </TableHeader>
                    <TableHeader darkMode={props.darkMode}>
                      7d%
                      <SortButton
                        onClick={() =>
                          props.sortItems("price_change_percentage_7d_in_currency")
                        }
                      >
                        {setSortIcon(
                          props.coins.sort
                            .price_change_percentage_7d_in_currency
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
              <StyledMessage>{props.coins.errorMessage}</StyledMessage>
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
      getMoreCoins: () => dispatch(getMoreCoins())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Coins);