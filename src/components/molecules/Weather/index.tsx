import Dropdown from '@/components/atoms/DropdownButton';
import Effect from '@/components/atoms/Effect';
import { setField, setWeather } from '@/pages/app/envSlice';
import { RootState } from '@/pages/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const WeatherField: React.FC = () => {
  const dispatch = useDispatch();

  const weathers = ['なし', 'はれ', 'あめ', 'あられ', 'すなあらし'];
  const fields = ['なし', 'エレキフィールド', 'グラスフィールド', 'ミストフィールド', 'サイコフィールド'];

  const weather = useSelector((state: RootState) => state.env.weather);
  const field = useSelector((state: RootState) => state.env.field);

  return (
    <div className="flex items-center">
      <Dropdown
        title="天候"
        initialPos={0}
        selected={weather}
        options={weathers}
        onSelect={(option) => dispatch(setWeather(option))}
      />
      <div className="mx-3">
        <Effect
          title="フィールド"
          initialPos={0}
          selected={field}
          options={fields}
          onSelect={(option) => dispatch(setField(option))}
        />
      </div>
    </div>
  );
};

export default WeatherField;
