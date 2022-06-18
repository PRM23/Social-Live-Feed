type GreetProps = {
  name: string;
  messageCount:number;
  isLoggedIn:boolean
};

export const Greet = (props: GreetProps) => {
  return (
    <div>{props.isLoggedIn? <h5>Hello, {props.name}</h5>:"Welcome Guest"}
     
    </div>
  );
};
