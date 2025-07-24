import { Star, Quote, ExternalLink, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Review {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

interface GoogleReviewsData {
  rating: number;
  user_ratings_total: number;
  reviews: Review[];
}

export default function Reviews() {
  const [reviewsData, setReviewsData] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews');
        if (response.ok) {
          const data = await response.json();
          setReviewsData(data);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleViewAllReviews = () => {
    window.open('https://maps.google.com/', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-yellow-500/10 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-yellow-600 text-sm font-medium uppercase tracking-wide">
              Avaliações
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            O Que Nossos <span className="text-yellow-600">Clientes Dizem</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A confiança dos nossos clientes é nosso maior patrimônio. 
            Veja o que eles falam sobre nossos serviços.
          </p>

          {/* Google Rating Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto mb-12">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-red-500 mr-2" />
              <span className="text-lg font-semibold text-gray-900">Google Reviews</span>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {reviewsData?.rating || 4.8}
            </div>
            <div className="flex items-center justify-center mb-2">
              {renderStars(Math.floor(reviewsData?.rating || 4.8))}
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Baseado em {reviewsData?.user_ratings_total || 127} avaliações
            </p>
            <button
              onClick={handleViewAllReviews}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 mx-auto"
            >
              <span>Ver no Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading || !reviewsData ? (
            // Loading state
            Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : (
            reviewsData.reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={review.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=f59e0b&color=fff`}
                    alt={review.author_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{review.author_name}</h4>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(review.time * 1000).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-1 w-6 h-6 text-yellow-500/20" />
                  <p className="text-gray-700 leading-relaxed pl-6 italic">
                    "{review.text}"
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Quer Ser Nosso Próximo Cliente Satisfeito?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos ajudá-lo 
              a resolver suas questões jurídicas com excelência.
            </p>
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25">
              Agendar Consulta Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
