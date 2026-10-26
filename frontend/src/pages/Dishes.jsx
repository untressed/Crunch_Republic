import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import CustomDropdown from '../components/CustomDropdown';
import { useAuth } from '../context/AuthContext';
import { getDishImage } from '../utils/dishImageHelper';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Utensils, 
  Tag, 
  Loader2, 
  AlertTriangle,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Sparkles,
  Minus,
  Percent,
  Check,
  Package
} from 'lucide-react';

const Dishes = () => {
  const { token } = useAuth();
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [image, setImage] = useState('');

  // Combo Bundle states
  const [isCombo, setIsCombo] = useState(false);
  const [comboItems, setComboItems] = useState([]); // [{ dish: id, name, price, quantity, isVeg, image }]
  const [comboDishSelect, setComboDishSelect] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const dishesRes = await fetch('/api/dishes', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dishesData = await dishesRes.json();
      if (dishesData.success) {
        setDishes(dishesData.data);
      }

      const categoriesRes = await fetch('/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const categoriesData = await categoriesRes.json();
      if (categoriesData.success) {
        setCategories(categoriesData.data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // Open Add / Edit Modals
  const openAddModal = () => {
    if (categories.length === 0) {
      alert('Please create at least one category tag first!');
      return;
    }
    setIsEditMode(false);
    setSelectedId(null);
    setName('');
    setCategoryId(categories[0]._id);
    setPrice('');
    setDescription('');
    setIsVeg(true);
    setIsAvailable(true);
    setImage('');
    setIsCombo(false);
    setComboItems([]);
    setComboDishSelect('');
    setErrorMsg('');
    setIsOpen(true);
  };

  const openEditModal = (dish) => {
    setIsEditMode(true);
    setSelectedId(dish._id);
    setName(dish.name);
    setCategoryId(dish.category?._id || categories[0]?._id);
    setPrice(dish.price.toString());
    setDescription(dish.description || '');
    setIsVeg(dish.isVeg);
    setIsAvailable(dish.isAvailable);
    setImage(dish.image || '');
    setIsCombo(Boolean(dish.isCombo));
    if (dish.isCombo && Array.isArray(dish.comboItems)) {
      setComboItems(
        dish.comboItems.map((item) => ({
          dish: item.dish?._id || item.dish || '',
          name: item.name || item.dish?.name || 'Dish',
          price: item.price !== undefined ? item.price : (item.dish?.price || 0),
          quantity: item.quantity || 1,
          isVeg: item.dish?.isVeg !== undefined ? item.dish.isVeg : true,
          image: item.dish?.image || '',
        }))
      );
    } else {
      setComboItems([]);
    }
    setComboDishSelect('');
    setErrorMsg('');
    setIsOpen(true);
  };

  // Combo Helper Handlers
  const handleAddDishToCombo = (dishId) => {
    if (!dishId) return;
    const found = dishes.find(d => d._id === dishId);
    if (!found) return;

    setComboItems(prev => {
      const existingIdx = prev.findIndex(item => item.dish === dishId);
      let updated;
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx].quantity += 1;
      } else {
        updated = [
          ...prev,
          {
            dish: found._id,
            name: found.name,
            price: found.price,
            quantity: 1,
            isVeg: found.isVeg,
            image: found.image || '',
          }
        ];
      }

      // Auto update veg status (if any item is non-veg, combo is non-veg)
      const anyNonVeg = updated.some(item => !item.isVeg);
      setIsVeg(!anyNonVeg);

      // Auto-set image if currently empty
      if (!image && found.image) {
        setImage(found.image);
      }

      return updated;
    });

    setComboDishSelect('');
  };

  const handleUpdateComboQty = (dishId, delta) => {
    setComboItems(prev => {
      const updated = prev
        .map(item => {
          if (item.dish === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);

      const anyNonVeg = updated.some(item => !item.isVeg);
      setIsVeg(!anyNonVeg);
      return updated;
    });
  };

  const handleRemoveFromCombo = (dishId) => {
    setComboItems(prev => {
      const updated = prev.filter(item => item.dish !== dishId);
      const anyNonVeg = updated.some(item => !item.isVeg);
      setIsVeg(!anyNonVeg);
      return updated;
    });
  };

  // Pricing & Savings computation
  const comboOriginalTotal = comboItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const currentPriceNum = Number(price) || 0;
  const savingsAmount = comboOriginalTotal > currentPriceNum ? comboOriginalTotal - currentPriceNum : 0;
  const savingsPercent = comboOriginalTotal > 0 && savingsAmount > 0 
    ? Math.round((savingsAmount / comboOriginalTotal) * 100) 
    : 0;

  const handleAutoGenerateComboDescription = () => {
    if (comboItems.length === 0) return;
    const itemsList = comboItems.map(item => `${item.quantity}× ${item.name}`).join(' + ');
    let autoDesc = `Value Combo includes: ${itemsList}.`;
    if (savingsAmount > 0) {
      autoDesc += ` Save ₹${savingsAmount.toFixed(0)} (${savingsPercent}% OFF)!`;
    }
    setDescription(autoDesc);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  // Submit modal details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !categoryId || price === '') {
      setErrorMsg('Please enter name, category and price.');
      return;
    }

    if (isCombo && comboItems.length === 0) {
      setErrorMsg('Please select at least 1 menu item to bundle into this combo.');
      return;
    }

    setSubmitLoading(true);
    setErrorMsg('');

    const url = isEditMode ? `/api/dishes/${selectedId}` : '/api/dishes';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          category: categoryId,
          price: Number(price),
          description: description.trim(),
          isVeg,
          isAvailable,
          image,
          isCombo,
          comboItems: isCombo ? comboItems.map(ci => ({
            dish: ci.dish,
            name: ci.name,
            quantity: ci.quantity,
            price: ci.price,
          })) : [],
          originalPrice: isCombo ? comboOriginalTotal : 0,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIsOpen(false);
        fetchData();
      } else {
        setErrorMsg(data.message || 'Failed to save dish.');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Server error occurred.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Toggle availability immediately
  const handleToggleAvailability = async (dish) => {
    try {
      const response = await fetch(`/api/dishes/${dish._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          isAvailable: !dish.isAvailable,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setDishes(prev => prev.map(d => d._id === dish._id ? { ...d, isAvailable: !d.isAvailable } : d));
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  // Delete dish
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this dish?')) {
      return;
    }

    try {
      const response = await fetch(`/api/dishes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        fetchData();
      } else {
        alert(data.message || 'Failed to delete dish.');
      }
    } catch (error) {
      console.error(error);
      alert('Server error occurred.');
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar title="Menu Items" />

        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Header toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 border border-slate-200/60 rounded-2xl shadow-soft">
            <div>
              <h2 className="text-base font-extrabold text-slate-800 uppercase tracking-tight">Dishes Catalog</h2>
              <p className="text-xs text-slate-400 mt-1 font-medium">Add photos, tags, customizable descriptions and sold-out controls.</p>
            </div>

            <button
              onClick={openAddModal}
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all shadow-md shadow-brand-500/10 flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Add New Dish</span>
            </button>
          </div>

          {/* Catalog grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-2">
              <Loader2 className="w-7 h-7 animate-spin text-brand-500" />
              <span className="text-xs text-slate-400 font-semibold">Loading recipes catalog...</span>
            </div>
          ) : dishes.length === 0 ? (
            <div className="bg-white border border-slate-200/65 rounded-2xl p-12 text-center max-w-sm mx-auto shadow-soft">
              <Utensils className="w-10 h-10 stroke-[1.2] text-slate-400 mx-auto mb-3" />
              <h3 className="text-sm font-extrabold text-slate-800 uppercase">Catalog is empty</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Add delicious recipes and tags to list them in categories for your customers to place orders.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {dishes.map((dish) => (
                <div 
                  key={dish._id}
                  className={`bg-white border ${dish.isAvailable ? 'border-slate-200/70' : 'border-slate-150 opacity-60'} rounded-2xl overflow-hidden shadow-soft hover:shadow-premium hover:border-slate-300 transition-all flex flex-col group relative`}
                >
                  {/* Photo area */}
                  <div className="h-40 w-full bg-slate-50 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                    {getDishImage(dish) ? (
                      <img 
                        src={getDishImage(dish)} 
                        alt={dish.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/dishes/samosa.webp';
                          e.target.className = 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105';
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-slate-400 select-none">
                        <ImageIcon className="w-6 h-6 stroke-[1.2]" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">No recipe photo</span>
                      </div>
                    )}

                    {/* Veg / Non-Veg badge tag */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-lg border border-slate-200 shadow-sm">
                      <span className={`w-2.5 h-2.5 rounded-full border border-white/20 flex items-center justify-center bg-slate-100`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dish.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                      </span>
                      <span className="text-[9px] uppercase font-black text-slate-600 tracking-wider">
                        {dish.isVeg ? 'Veg' : 'Non-veg'}
                      </span>
                    </div>

                    {/* Combo Badge */}
                    {dish.isCombo && (
                      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-amber-500/95 text-white backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-wider shadow-md border border-amber-400">
                        <Sparkles className="w-2.5 h-2.5 fill-white" />
                        <span>Combo Deal</span>
                        {dish.originalPrice > dish.price && (
                          <span className="bg-black/20 px-1 py-0.2 rounded text-[8px] font-bold">
                            Save ₹{(dish.originalPrice - dish.price).toFixed(0)}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Category absolute tag */}
                    {dish.category && (
                      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-brand-50/90 backdrop-blur-md border border-brand-100 rounded-lg text-[9px] font-extrabold uppercase tracking-wide text-brand-600">
                        {dish.category.name}
                      </div>
                    )}
                  </div>

                  {/* Body Information */}
                  <div className="p-5 flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-extrabold text-slate-800 text-xs tracking-tight truncate leading-tight group-hover:text-brand-600 transition-colors">{dish.name}</h4>
                      <div className="flex items-baseline gap-1.5 shrink-0">
                        <span className="text-xs font-black text-brand-600">₹{dish.price.toFixed(0)}</span>
                        {dish.isCombo && dish.originalPrice > dish.price && (
                          <span className="text-[10px] text-slate-400 line-through font-bold">
                            ₹{dish.originalPrice.toFixed(0)}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-relaxed flex-1 line-clamp-2 h-7 font-medium">{dish.description || 'No custom details added.'}</p>

                    {/* Combo Items Pill Breakdown */}
                    {dish.isCombo && Array.isArray(dish.comboItems) && dish.comboItems.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                        {dish.comboItems.map((ci, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center gap-1 text-[9px] bg-amber-50 text-amber-900 border border-amber-200/60 px-1.5 py-0.5 rounded-md font-bold"
                          >
                            <Package className="w-2.5 h-2.5 text-amber-600" />
                            {ci.quantity}× {ci.name || ci.dish?.name || 'Item'}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Options Actions */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-3.5 mt-2.5">
                      {/* Availability status switcher */}
                      <button
                        onClick={() => handleToggleAvailability(dish)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[9px] font-extrabold uppercase tracking-wider transition-colors ${
                          dish.isAvailable
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-500 border-rose-100 hover:bg-rose-100'
                        }`}
                      >
                        {dish.isAvailable ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>In Stock</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Sold Out</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(dish)}
                          className="w-7 h-7 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors border border-slate-150 shadow-sm"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(dish._id)}
                          className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 hover:text-rose-700 flex items-center justify-center transition-colors border border-rose-100 shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal Add/Edit Form */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={isEditMode ? 'Modify Dish settings' : 'Add Catalog Item / Combo'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-100 text-rose-800 text-xs px-4 py-3 rounded-xl flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="font-semibold">{errorMsg}</span>
            </div>
          )}

          {/* ITEM TYPE SWITCHER: Single Item vs Combo Bundle */}
          <div className="flex p-1 bg-slate-100 rounded-xl gap-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setIsCombo(false)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                !isCombo
                  ? 'bg-white text-slate-800 shadow-sm border border-slate-200/60'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-slate-500" />
              <span>Single Dish Item</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCombo(true)}
              className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                isCombo
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-amber-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>✨ Combo Meal Bundle</span>
            </button>
          </div>

          {/* COMBO BUILDER DRAWER: If isCombo is active */}
          {isCombo && (
            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-black text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bundle Existing Menu Items</span>
                  </h5>
                  <p className="text-[10px] text-amber-700/80 font-medium mt-0.5">
                    Select dishes from your existing catalog to combine into this value meal.
                  </p>
                </div>
                {comboItems.length > 0 && (
                  <span className="text-[10px] font-extrabold bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-full">
                    {comboItems.reduce((acc, c) => acc + c.quantity, 0)} items bundled
                  </span>
                )}
              </div>

              {/* Add item selector */}
              <div className="flex items-center gap-2">
                <CustomDropdown
                  options={dishes
                    .filter((d) => (!selectedId || d._id !== selectedId) && !d.isCombo)
                    .map((d) => ({
                      value: d._id,
                      label: d.name,
                      sublabel: `${d.category?.name || 'Item'} · ₹${d.price}`,
                      badge: `₹${d.price}`,
                      isVeg: d.isVeg,
                    }))}
                  value={comboDishSelect}
                  onChange={(val) => setComboDishSelect(val)}
                  placeholder="-- Choose dish to bundle --"
                  searchable={true}
                  searchPlaceholder="Search recipe by name or category..."
                  size="sm"
                  variant="amber"
                  className="flex-1"
                />
                <button
                  type="button"
                  disabled={!comboDishSelect}
                  onClick={() => handleAddDishToCombo(comboDishSelect)}
                  className="px-3.5 py-1.5 h-8 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Chosen Items List */}
              {comboItems.length === 0 ? (
                <div className="p-4 bg-white/80 rounded-xl border border-dashed border-amber-300 text-center">
                  <p className="text-xs text-amber-800/70 font-semibold">
                    No items selected yet. Choose dishes from the dropdown above to package your combo!
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {comboItems.map((item) => (
                    <div 
                      key={item.dish}
                      className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-amber-100 shadow-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block leading-tight">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-medium">₹{item.price} each</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleUpdateComboQty(item.dish, -1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-slate-200 text-slate-600"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="px-2 text-xs font-black text-slate-800">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateComboQty(item.dish, 1)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-slate-200 text-slate-600"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <span className="text-xs font-extrabold text-slate-700 min-w-12 text-right">
                          ₹{item.price * item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleRemoveFromCombo(item.dish)}
                          className="w-6 h-6 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Combo Value & Savings Dashboard */}
              {comboItems.length > 0 && (
                <div className="pt-2 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-900/70 uppercase">Combined Value:</span>
                    <span className="text-xs font-extrabold text-slate-800">₹{comboOriginalTotal}</span>
                    {savingsAmount > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Percent className="w-2.5 h-2.5" />
                        Saves ₹{savingsAmount.toFixed(0)} ({savingsPercent}% OFF)
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleAutoGenerateComboDescription}
                    className="text-[10px] font-black text-amber-800 hover:text-amber-950 flex items-center gap-1 hover:underline"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Auto-Write Description</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Image select preview */}
          <div className="flex flex-col items-center gap-2 pb-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 self-start">
              {isCombo ? 'Combo Promotional Photo' : 'Dish Recipe Cover'}
            </label>
            <div className="w-full h-32 rounded-xl border-2 border-dashed border-slate-200 hover:border-brand-500/50 flex flex-col items-center justify-center relative overflow-hidden transition-colors bg-slate-50 group">
              {image ? (
                <>
                  <img src={getDishImage(image)} alt="Preview" className="w-full h-full object-contain p-2" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold text-white transition-opacity cursor-pointer">
                    Change Image
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-slate-400 cursor-pointer">
                  <ImageIcon className="w-5 h-5 stroke-[1.2]" />
                  <span className="text-[9px] font-bold uppercase">Select PNG/JPG file</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isCombo ? 'Combo Meal Name *' : 'Dish Name *'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isCombo ? 'Crunch Burger & Shake Combo' : 'Crispy Veg Burger'}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-brand-500 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isCombo ? 'Special Combo Price (₹) *' : 'Dish Price (₹) *'}
              </label>
              <input
                type="number"
                step="1"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={isCombo && comboOriginalTotal ? Math.max(0, comboOriginalTotal - 30).toString() : '99'}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-brand-500 font-black"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Category Tag *</label>
              <CustomDropdown
                options={categories.map((c) => ({
                  value: c._id,
                  label: c.name,
                }))}
                value={categoryId}
                onChange={(val) => setCategoryId(val)}
                placeholder="Select Category"
                size="md"
              />
            </div>

            {/* Veg tag switchers */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Food Tag type</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsVeg(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                    isVeg 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-xs' 
                      : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Vegetarian</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsVeg(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                    !isVeg 
                      ? 'bg-rose-50 text-rose-500 border-rose-100 shadow-xs' 
                      : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>Non-Veg</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Freshly prepared, customizable items served hot and crisp."
              rows="3"
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-brand-500 resize-none font-medium"
            />
          </div>

          {/* Immediate availability toggle switcher */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl mt-2">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-700">Set Available Instantly</span>
              <span className="text-[9px] text-slate-400 font-semibold">Let guest orders checkout this item now.</span>
            </div>
            <button
              type="button"
              onClick={() => setIsAvailable(!isAvailable)}
              className={`w-11 h-5.5 rounded-full transition-colors relative flex items-center p-0.5 ${
                isAvailable ? 'bg-brand-600' : 'bg-slate-300'
              }`}
            >
              <span className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                isAvailable ? 'translate-x-5.5' : 'translate-x-0'
              }`}></span>
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold rounded-xl text-xs uppercase tracking-widest border border-slate-150 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitLoading}
              className="bg-brand-600 hover:bg-brand-500 disabled:bg-brand-800 disabled:cursor-not-allowed text-white font-bold rounded-xl text-xs uppercase tracking-widest px-5 py-2.5 flex items-center gap-1.5 shadow-md shadow-brand-500/10"
            >
              {submitLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              <span>{isEditMode ? 'Update' : (isCombo ? 'Create Combo Meal' : 'Create Item')}</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Dishes;
