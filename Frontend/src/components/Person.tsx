type personProps = {
    name:{
        firstname: string;
    }
    
};

export const Person = (props: personProps) => {
  return <div>{props.name.firstname}</div>;
};
