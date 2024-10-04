import { useState } from "react";

export interface searchProps {
    suggestions: any[];
    suggestion: string;
    dataSet: () => void;
    opeDialog: (ope: boolean) => void;
}

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const dialogBoxStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  };

const SearchDialog: React.FC<searchProps> = ({
    suggestions, 
    dataSet, 
    suggestion
}) => {

    const [query, setQuery] = useState<string>(suggestion);
    
}