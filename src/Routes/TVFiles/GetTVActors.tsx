import { useQuery } from "react-query";
import styled from "styled-components";
import { GetTVCredits } from "../api";

const API_KEY = "dcbad9ac7abbeb5a64c3012897391ecb";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IProps {
  tvId: number;
}

interface ICast {
  id: number;
  name: string;
  profile_path: string;
  character: string;
  credit_id: string;
}

export interface IActros {
  cast: ICast[];
}

const ActorBox = styled.div`
  padding: 20px;
  font-size: 17px;
  line-height: 20px;
  span:first-child {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const GetTVActors = ({ tvId }: IProps) => {
  const { data, isLoading } = useQuery<IActros>(["Actors", tvId], () =>
    GetTVCredits(tvId as any)
  );
  const actorsData = data?.cast.slice(0, 5).map((v) => v.name);

  return (
    <>
      {isLoading ? null : (
        <ActorBox>
          <span>Actors: </span>
          {actorsData?.map((v, index) => {
            return <span key={index}>{v}, </span>;
          })}
          <span>...</span>
        </ActorBox>
      )}
    </>
  );
};

export default GetTVActors;
