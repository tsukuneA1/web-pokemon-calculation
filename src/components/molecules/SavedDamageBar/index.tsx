import { DamageBarProps } from "../DamageBar";
import CustomSlider from "../DamageSlider";

const SavedDamageBar: React.FC<DamageBarProps> = ({
    pos1,
    pos2,
    damageText,
}) => {
    return (
        <div className="pt-2">
        <CustomSlider
            min={0}
            max={0}
            color1="#4caf50"
            color2="#ff5722"
            backgroundColor="#e0e0e0"
            position1={pos1}
            position2={pos2}
          />
          <div className="text-sm sm:text-base mt-2 md:text-lg lg:mt-3 text-start">{damageText}</div>
        </div>
    )

}

export default SavedDamageBar