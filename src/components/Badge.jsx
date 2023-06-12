const Badge = ({str}) => {
  return (
    <>
      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-3 text-base font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
        {str}
      </span>
    </>
  );
};

export default Badge;
