import { RootState, setPreeminence } from "@/pages/app/store"
import CheckBox from "@/components/atoms/CheckBox";
import { useDispatch, useSelector } from "react-redux"
import { typeInterface } from "@/interfaces";

const Preeminence: React.FC = () => {
    const dispatch = useDispatch();
    const preeminence = useSelector((state: RootState) => state.stats.stellaPreeminence);
    const atTera = useSelector((state: RootState) => state.stats.atTera);
    const skill = useSelector((state: RootState) => state.stats.selectedSkill);

    if(atTera === typeInterface[19] && (skill.name === 'テラバースト' || skill.name === "テラクラスター")){
        return (
            <div className="my-3">
                <CheckBox
                    content="相手がテラスタル中"
                    checked={preeminence}
                    handleChange={(e) => {dispatch(setPreeminence(e.target.checked))}}
                ></CheckBox>
            </div>
        )
    }else{
        dispatch(setPreeminence(false));
    }
}

export default Preeminence;