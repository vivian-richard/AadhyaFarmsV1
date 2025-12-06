import React, { useState } from 'react';
import { useGift } from '../context/GiftContext';
import { useNavigate } from 'react-router-dom';
import {
  Gift, ShoppingBag, Sparkles, Plus, Minus, Trash2,
  Package, Star, Heart, Calendar, Mail, Phone,
  MapPin, MessageCircle, Check, X, ArrowRight, CreditCard
} from 'lucide-react';

const GiftsHampers: React.FC = () => {
  const {
    preMadeHampers,
    availableProducts,
    giftCardDesigns,
    packagingOptions,
    purchaseGiftCard,
    createCustomHamper,
    addMessageToHamper,
    placeGiftOrder,
  } = useGift();

  const navigate = useNavigate();

  // State Management
  const [activeTab, setActiveTab] = useState<'giftcards' | 'premade' | 'custom'>('giftcards');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showGiftCardForm, setShowGiftCardForm] = useState(false);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<any>(null);
  const [checkoutType, setCheckoutType] = useState<'giftcard' | 'premade-hamper' | 'custom-hamper'>('giftcard');

  // Gift Card Form State
  const [gcAmount, setGcAmount] = useState(1000);
  const [gcRecipientName, setGcRecipientName] = useState('');
  const [gcRecipientEmail, setGcRecipientEmail] = useState('');
  const [gcSenderName, setGcSenderName] = useState('');
  const [gcMessage, setGcMessage] = useState('');
  const [gcDesign, setGcDesign] = useState('design-1');

  // Custom Hamper State
  const [customHamperName, setCustomHamperName] = useState('');
  const [customHamperItems, setCustomHamperItems] = useState<any[]>([]);
  const [customPackaging, setCustomPackaging] = useState<'standard' | 'premium' | 'luxury'>('standard');
  const [customMessage, setCustomMessage] = useState('');
  const [customRecipientName, setCustomRecipientName] = useState('');
  const [customRecipientEmail, setCustomRecipientEmail] = useState('');

  // Checkout Form State
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');

  const predefinedAmounts = [500, 1000, 2000, 5000];

  const handlePurchaseGiftCard = () => {
    if (!gcRecipientName || !gcRecipientEmail || !gcSenderName) {
      alert('Please fill all required fields');
      return;
    }

    const code = purchaseGiftCard(
      gcAmount,
      gcRecipientName,
      gcRecipientEmail,
      gcSenderName,
      gcMessage,
      gcDesign
    );

    alert(`🎉 Gift Card purchased successfully!\n\nGift Card Code: ${code}\n\nAn email has been sent to ${gcRecipientEmail}`);
    setShowGiftCardForm(false);
    // Reset form
    setGcAmount(1000);
    setGcRecipientName('');
    setGcRecipientEmail('');
    setGcSenderName('');
    setGcMessage('');
    setGcDesign('design-1');
  };

  const addToCustomHamper = (product: any) => {
    const existing = customHamperItems.find(item => item.productId === product.id);
    if (existing) {
      setCustomHamperItems(customHamperItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCustomHamperItems([...customHamperItems, {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price,
        image: product.image,
      }]);
    }
  };

  const removeFromCustomHamper = (productId: string) => {
    setCustomHamperItems(customHamperItems.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCustomHamperItems(customHamperItems.map(item => {
      if (item.productId === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const calculateCustomHamperTotal = () => {
    const itemsTotal = customHamperItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const packagingPrice = packagingOptions.find(p => p.type === customPackaging)?.price || 0;
    return itemsTotal + packagingPrice;
  };

  const handleSaveCustomHamper = () => {
    if (!customHamperName || customHamperItems.length === 0) {
      alert('Please name your hamper and add at least one product');
      return;
    }

    const hamperId = createCustomHamper(customHamperName, customHamperItems, customPackaging);
    
    if (customRecipientName && customRecipientEmail) {
      addMessageToHamper(hamperId, customRecipientName, customRecipientEmail, customMessage);
    }

    alert('✅ Custom hamper created successfully!');
    setShowCustomBuilder(false);
    // Reset form
    setCustomHamperName('');
    setCustomHamperItems([]);
    setCustomPackaging('standard');
    setCustomMessage('');
    setCustomRecipientName('');
    setCustomRecipientEmail('');
  };

  const handleCheckout = (type: 'giftcard' | 'premade-hamper' | 'custom-hamper', item: any) => {
    setCheckoutType(type);
    setCheckoutItem(item);
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    if (!deliveryName || !deliveryEmail || !deliveryPhone || !deliveryAddress || !deliveryDate) {
      alert('Please fill all delivery details');
      return;
    }

    const orderId = placeGiftOrder(
      checkoutType,
      checkoutItem.id,
      deliveryName,
      deliveryEmail,
      deliveryPhone,
      deliveryAddress,
      deliveryDate,
      deliveryMessage
    );

    alert(`🎉 Order placed successfully!\n\nOrder ID: ${orderId}\n\nYou will receive a confirmation email shortly.`);
    setShowCheckout(false);
    // Reset
    setDeliveryName('');
    setDeliveryEmail('');
    setDeliveryPhone('');
    setDeliveryAddress('');
    setDeliveryDate('');
    setDeliveryMessage('');
    setCheckoutItem(null);
  };

  const filteredHampers = selectedCategory === 'all'
    ? preMadeHampers
    : preMadeHampers.filter(h => h.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFE0] to-[#E8DCC8] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gift className="h-16 w-16 text-[#2D5016]" />
          </div>
          <h1 className="text-5xl font-bold text-[#2D5016] mb-4">Gifts & Hampers</h1>
          <p className="text-xl text-gray-600">Perfect gifts for every occasion - Fresh, Healthy, Memorable! 🎁</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('giftcards')}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
              activeTab === 'giftcards'
                ? 'bg-[#2D5016] text-white shadow-xl scale-105'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <CreditCard className="h-5 w-5" />
            Gift Cards
          </button>
          <button
            onClick={() => setActiveTab('premade')}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
              activeTab === 'premade'
                ? 'bg-[#2D5016] text-white shadow-xl scale-105'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Package className="h-5 w-5" />
            Pre-Made Hampers
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
              activeTab === 'custom'
                ? 'bg-[#2D5016] text-white shadow-xl scale-105'
                : 'bg-white text-[#2D5016] hover:bg-gray-100'
            }`}
          >
            <Sparkles className="h-5 w-5" />
            Custom Hamper Builder
          </button>
        </div>

        {/* Gift Cards Tab */}
        {activeTab === 'giftcards' && (
          <div className="space-y-8">
            {!showGiftCardForm ? (
              <>
                {/* Gift Card Info */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#2D5016] mb-4">Give the Gift of Choice</h2>
                    <p className="text-lg text-gray-600">Let your loved ones choose their favorite dairy products!</p>
                  </div>

                  {/* Amount Options */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {predefinedAmounts.map(amount => (
                      <div
                        key={amount}
                        className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border-2 border-green-200 hover:border-[#2D5016] transition-all cursor-pointer hover:shadow-lg"
                      >
                        <p className="text-3xl font-bold text-[#2D5016] mb-2">₹{amount}</p>
                        <p className="text-sm text-gray-600">Gift Card</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowGiftCardForm(true)}
                    className="w-full py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <Gift className="h-6 w-6" />
                    Purchase Gift Card
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg text-[#2D5016] mb-2">Email Delivery</h3>
                    <p className="text-gray-600">Instantly delivered to recipient's email</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="font-bold text-lg text-[#2D5016] mb-2">1 Year Validity</h3>
                    <p className="text-gray-600">Valid for 365 days from purchase</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="font-bold text-lg text-[#2D5016] mb-2">Personalized Message</h3>
                    <p className="text-gray-600">Add a heartfelt message</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#2D5016]">Purchase Gift Card</h2>
                  <button onClick={() => setShowGiftCardForm(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gift Card Amount *</label>
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      {predefinedAmounts.map(amount => (
                        <button
                          key={amount}
                          onClick={() => setGcAmount(amount)}
                          className={`py-3 rounded-lg font-bold transition-all ${
                            gcAmount === amount
                              ? 'bg-[#2D5016] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      value={gcAmount}
                      onChange={(e) => setGcAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                      placeholder="Custom amount"
                      min="100"
                    />
                  </div>

                  {/* Design */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Choose Design *</label>
                    <div className="grid grid-cols-3 gap-4">
                      {giftCardDesigns.map(design => (
                        <button
                          key={design.id}
                          onClick={() => setGcDesign(design.id)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            gcDesign === design.id
                              ? 'border-[#2D5016] bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-4xl mb-2">{design.image}</div>
                          <p className="text-sm font-semibold text-gray-700">{design.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recipient Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Name *</label>
                      <input
                        type="text"
                        value={gcRecipientName}
                        onChange={(e) => setGcRecipientName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        placeholder="Enter recipient's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Email *</label>
                      <input
                        type="email"
                        value={gcRecipientEmail}
                        onChange={(e) => setGcRecipientEmail(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        placeholder="recipient@example.com"
                      />
                    </div>
                  </div>

                  {/* Sender Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={gcSenderName}
                      onChange={(e) => setGcSenderName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Personal Message</label>
                    <textarea
                      value={gcMessage}
                      onChange={(e) => setGcMessage(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                      rows={4}
                      placeholder="Add a heartfelt message..."
                    />
                  </div>

                  <button
                    onClick={handlePurchaseGiftCard}
                    className="w-full py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Gift className="h-6 w-6" />
                    Purchase for ₹{gcAmount}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pre-Made Hampers Tab */}
        {activeTab === 'premade' && (
          <div className="space-y-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {['all', 'festival', 'birthday', 'wedding', 'corporate', 'wellness'].map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-[#2D5016] text-white'
                      : 'bg-white text-[#2D5016] hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Hampers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHampers.map(hamper => (
                <div key={hamper.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all">
                  <div className="relative h-64 bg-gradient-to-br from-[#F5EFE0] to-white p-8 flex items-center justify-center">
                    <img src={hamper.image} alt={hamper.name} className="max-h-full max-w-full object-contain" />
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save ₹{hamper.originalPrice - hamper.price}
                    </div>
                    <div className="absolute top-4 left-4 bg-[#2D5016] text-white px-3 py-1 rounded-full text-xs font-bold">
                      {hamper.occasion}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#2D5016] mb-2">{hamper.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{hamper.description}</p>

                    {/* Items List */}
                    <div className="bg-[#F5EFE0] rounded-lg p-4 mb-4">
                      <p className="font-semibold text-[#2D5016] mb-2">Contains:</p>
                      <ul className="space-y-1">
                        {hamper.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            {item.quantity}x {item.productName}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Packaging */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                      <Package className="h-4 w-4" />
                      {hamper.packaging}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-3xl font-bold text-[#2D5016]">₹{hamper.price}</p>
                        <p className="text-sm text-gray-500 line-through">₹{hamper.originalPrice}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCheckout('premade-hamper', hamper)}
                      className="w-full py-3 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-lg font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Hamper Builder Tab */}
        {activeTab === 'custom' && (
          <div className="space-y-8">
            {!showCustomBuilder ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2D5016] to-[#3D6020] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#2D5016] mb-4">Build Your Perfect Hamper</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Create a personalized hamper with your choice of products. Perfect for any occasion!
                </p>
                <button
                  onClick={() => setShowCustomBuilder(true)}
                  className="px-12 py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center gap-2"
                >
                  <Plus className="h-6 w-6" />
                  Start Building
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Products Selection */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <h3 className="text-2xl font-bold text-[#2D5016] mb-6">Select Products</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {availableProducts.map(product => (
                        <div key={product.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#2D5016] transition-all">
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center">
                              <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-800 text-sm">{product.name}</p>
                              <p className="text-lg font-bold text-[#2D5016]">₹{product.price}</p>
                            </div>
                            <button
                              onClick={() => addToCustomHamper(product)}
                              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex-shrink-0"
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cart & Summary */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                    <h3 className="text-xl font-bold text-[#2D5016] mb-4">Your Hamper</h3>

                    {/* Hamper Name */}
                    <input
                      type="text"
                      value={customHamperName}
                      onChange={(e) => setCustomHamperName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none mb-4"
                      placeholder="Give your hamper a name..."
                    />

                    {/* Items */}
                    {customHamperItems.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No items added yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                        {customHamperItems.map(item => (
                          <div key={item.productId} className="flex items-center gap-3 bg-[#F5EFE0] rounded-lg p-3">
                            <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center">
                              <img src={item.image} alt={item.productName} className="max-h-full max-w-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-gray-800 truncate">{item.productName}</p>
                              <p className="text-sm text-[#2D5016]">₹{item.price} × {item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button
                                onClick={() => updateQuantity(item.productId, -1)}
                                className="p-1 bg-white rounded hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.productId, 1)}
                                className="p-1 bg-white rounded hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => removeFromCustomHamper(item.productId)}
                                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Packaging Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Packaging</label>
                      <div className="space-y-2">
                        {packagingOptions.map(pkg => (
                          <button
                            key={pkg.type}
                            onClick={() => setCustomPackaging(pkg.type)}
                            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                              customPackaging === pkg.type
                                ? 'border-[#2D5016] bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">{pkg.image}</span>
                                <div>
                                  <p className="font-semibold text-sm">{pkg.name}</p>
                                  <p className="text-xs text-gray-600">{pkg.description}</p>
                                </div>
                              </div>
                              <span className="font-bold text-[#2D5016]">
                                {pkg.price === 0 ? 'Free' : `+₹${pkg.price}`}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Add Message (Optional)</label>
                      <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none text-sm"
                        rows={3}
                        placeholder="Write a personal message..."
                      />
                    </div>

                    {/* Total */}
                    <div className="border-t-2 border-gray-200 pt-4 mb-4">
                      <div className="flex items-center justify-between text-2xl font-bold text-[#2D5016]">
                        <span>Total:</span>
                        <span>₹{calculateCustomHamperTotal()}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveCustomHamper}
                      disabled={customHamperItems.length === 0 || !customHamperName}
                      className="w-full py-3 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-lg font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Check className="h-5 w-5" />
                      Save Hamper
                    </button>

                    <button
                      onClick={() => setShowCustomBuilder(false)}
                      className="w-full py-2 mt-2 text-gray-600 hover:text-gray-800 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckout && checkoutItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
              <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#2D5016]">Complete Your Order</h2>
                  <button onClick={() => setShowCheckout(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Order Summary */}
                  <div className="bg-[#F5EFE0] rounded-lg p-4">
                    <h3 className="font-bold text-[#2D5016] mb-2">Order Summary</h3>
                    <p className="text-gray-700">{checkoutItem.name}</p>
                    <p className="text-2xl font-bold text-[#2D5016] mt-2">
                      ₹{checkoutItem.price || checkoutItem.amount || checkoutItem.totalPrice}
                    </p>
                  </div>

                  {/* Delivery Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient Name *</label>
                      <input
                        type="text"
                        value={deliveryName}
                        onChange={(e) => setDeliveryName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={deliveryEmail}
                        onChange={(e) => setDeliveryEmail(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={deliveryPhone}
                        onChange={(e) => setDeliveryPhone(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                        placeholder="Mobile number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Date *</label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address *</label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                      rows={3}
                      placeholder="Complete delivery address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gift Message</label>
                    <textarea
                      value={deliveryMessage}
                      onChange={(e) => setDeliveryMessage(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#2D5016] focus:outline-none"
                      rows={3}
                      placeholder="Add a personal message for the recipient..."
                    />
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 bg-gradient-to-r from-[#2D5016] to-[#3D6020] text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="h-6 w-6" />
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftsHampers;
