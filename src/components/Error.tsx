interface Props {
  message?: string;
}

const Error = ({ message = "Something went wrong" }: Props) => (
  <p className="text-red text-bold text-center">{message}</p>
);

export default Error;
