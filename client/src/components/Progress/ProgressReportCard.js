const ProgressReportCard = (progress) => {
    return (
        <div className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="card-body">
          <h5 className="text-xl font-semibold mb-2">Satisfaction: {progress.satisfaction}</h5>
          <p className="text-sm text-gray-700 mb-4">Carbohydrates: {progress.date}</p>
          
        </div>
      </div>
    )
}

export default ProgressReportCard;