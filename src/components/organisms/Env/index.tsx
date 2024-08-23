import { FluentWeatherRainShowersDay20Filled, MiniFluentWeatherRainShowersDay20Filled } from '@/components/icons/Icons';
import Header from '@/components/molecules/Header';
import WeatherField from '@/components/molecules/Weather';
import Screen from '@/components/molecules/Screen';
import React from 'react';
import ExtraDamage from '@/components/molecules/ExtraDamage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { setEnvFold } from '@/app/foldSlice';
import { useWindowSize } from '@/function/GetWindowSize';

const Env: React.FC = () => {
  const dispatch = useDispatch();
  const envFold = useSelector((state: RootState) => state.fold.envFold);
  const headerIconClick = () => {
    dispatch(setEnvFold(!envFold));
  };

  const windowSize = useWindowSize();

  return (
    <div className="flex items-center justify-center lg:items-center w-full">
      <div style={{ width: '95%' }}>
        <Header
          title="環境"
          icon={
            windowSize.width < 640 ? (
              <MiniFluentWeatherRainShowersDay20Filled />
            ) : (
              <FluentWeatherRainShowersDay20Filled />
            )
          }
          onIconClick={headerIconClick}
          fold={envFold}
          width={windowSize.width}
        />
        {envFold ? (
          <></>
        ) : (
          <div className="w-full p-3 bg-gray-10 pb-10 rounded-b-2xl">
            <div className="xl:flex ">
              <WeatherField />
              <Screen />
            </div>
            <ExtraDamage />
          </div>
        )}
      </div>
    </div>
  );
};

export default Env;
