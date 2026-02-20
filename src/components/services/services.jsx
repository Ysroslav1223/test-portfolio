import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { X, Loader2 } from 'lucide-react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const estimateSchema = yup.object({
  name: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа'),
  contact: yup.string().required('Контакт обязателен').min(5, 'Минимум 5 символов'),
  projectType: yup.string().required('Выберите тип проекта'),
  budget: yup.number()
    .typeError('Бюджет должен быть числом')
    .positive('Бюджет должен быть положительным')
    .required('Бюджет обязателен'),
  deadline: yup.string().required('Выберите сроки'),
  projectDetails: yup.string()
    .required('Детали проекта обязательны')
    .min(10, 'Минимум 10 символов')
})

const briefSchema = yup.object({
  name: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа'),
  contact: yup.string().required('Контакт обязателен').min(5, 'Минимум 5 символов'),
  briefType: yup.string().required('Выберите тип брифа'),
  projectDetails: yup.string()
    .required('Описание проекта обязательно')
    .min(20, 'Минимум 20 символов')
})

const contactSchema = yup.object({
  name: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа'),
  contact: yup.string().required('Контакт обязателен').min(5, 'Минимум 5 символов'),
  message: yup.string()
    .required('Сообщение обязательно')
    .min(10, 'Минимум 10 символов')
})

const getSchema = (formType) => {
  switch (formType) {
    case 'смета': return estimateSchema
    case 'бриф': return briefSchema
    case 'связь': return contactSchema
    default: return yup.object()
  }
}

const prepareEstimateData = (data) => ({
  name: data.name,
  contact: data.contact,
  estimate_type: data.projectType,
  currency: "RUB",
  project_details: data.projectDetails,
  amount: data.budget.toString()
})

const prepareBriefData = (data) => ({
  name: data.name,
  contact: data.contact,
  brief_type: data.briefType,
  project_details: data.projectDetails
})

const prepareContactData = (data) => ({
  name: data.name,
  email: data.contact,
  message: data.message
})

const sendToBackend = async (data, formType) => {
  let endpoint = ''
  let dataToSend = {}

  switch (formType) {
    case 'смета':
      endpoint = '/estimates'
      dataToSend = prepareEstimateData(data)
      break
    case 'бриф':
      endpoint = '/brief'
      dataToSend = prepareBriefData(data)
      break
    case 'связь':
      endpoint = '/contact'
      dataToSend = prepareContactData(data)
      break
    default:
      throw new Error('Неизвестный тип формы')
  }

  const baseUrl = 'http://localhost:8001'
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToSend),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorText}`)
  }

  return response.json()
}

function ModalForm({ formType, onClose, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(getSchema(formType)),
    mode: 'onChange',
    defaultValues: {
      name: '',
      contact: '',
      projectType: '',
      budget: '',
      deadline: '',
      projectDetails: '',
      briefType: '',
      message: ''
    }
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      await sendToBackend(data, formType)
      onSuccess()
      reset()
      setTimeout(() => onClose(), 1500)
    } catch (err) {
      console.error('Ошибка отправки:', err)
      alert(`Ошибка отправки: ${err.message}. Попробуйте ещё раз.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const title = formType === 'смета' ? 'Запрос сметы' : formType === 'бриф' ? 'Заполнение брифа' : 'Связаться'
  const subtitle = formType === 'смета' ? 'Получите расчёт стоимости' : formType === 'бриф' ? 'Опишите детали проекта' : 'Задайте вопрос или обсудите сотрудничество'

  const inputClass = (hasError) =>
    `w-full px-3 py-2.5 rounded-lg border bg-white text-gray-900 placeholder:text-gray-400 text-sm
     focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all
     ${hasError ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-gray-800 focus:border-gray-800'}`

  const labelClass = "block text-xs font-medium text-gray-700 mb-1"

  return (
    <div className="bg-white rounded-none md:rounded-2xl shadow-xl flex flex-col w-full h-full md:h-auto md:max-w-lg overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 md:px-6 md:py-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => !isSubmitting && onClose()}
            disabled={isSubmitting}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
            aria-label="Закрыть"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Form body — без скролла, компактная вёрстка */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 overflow-hidden px-4 py-3 md:px-6 md:py-4">
          <div className="space-y-3">
            <div>
              <label className={labelClass}>Имя <span className="text-red-500">*</span></label>
              <input
                type="text"
                {...register('name')}
                className={inputClass(!!errors.name)}
                placeholder="Иван Иванов"
                disabled={isSubmitting}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Контакт <span className="text-red-500">*</span></label>
              <input
                type="text"
                {...register('contact')}
                className={inputClass(!!errors.contact)}
                placeholder="Телефон, email или Telegram"
                disabled={isSubmitting}
              />
              {errors.contact && <p className="mt-1 text-xs text-red-500">{errors.contact.message}</p>}
            </div>

            {formType === 'смета' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Тип проекта <span className="text-red-500">*</span></label>
                    <select
                      {...register('projectType')}
                      className={inputClass(!!errors.projectType)}
                      disabled={isSubmitting}
                    >
                      <option value="">Выберите тип</option>
                      <option value="music_video">Музыкальный клип</option>
                      <option value="advertising">Рекламный ролик</option>
                      <option value="corporate">Корпоративное видео</option>
                      <option value="event">Съёмка мероприятия</option>
                      <option value="animation">Анимация / моушн</option>
                      <option value="other">Другое</option>
                    </select>
                    {errors.projectType && <p className="mt-1 text-xs text-red-500">{errors.projectType.message}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Бюджет (руб.) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      {...register('budget')}
                      className={inputClass(!!errors.budget)}
                      placeholder="Например: 50000"
                      min="0"
                      disabled={isSubmitting}
                    />
                    {errors.budget && <p className="mt-1 text-xs text-red-500">{errors.budget.message}</p>}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Сроки <span className="text-red-500">*</span></label>
                  <select
                    {...register('deadline')}
                    className={inputClass(!!errors.deadline)}
                    disabled={isSubmitting}
                  >
                    <option value="">Выберите сроки</option>
                    <option value="urgent">Срочно (1–2 недели)</option>
                    <option value="1_month">В течение месяца</option>
                    <option value="1_3_months">1–3 месяца</option>
                    <option value="3_6_months">3–6 месяцев</option>
                    <option value="flexible">Гибкие сроки</option>
                  </select>
                  {errors.deadline && <p className="mt-1 text-xs text-red-500">{errors.deadline.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Детали проекта <span className="text-red-500">*</span></label>
                  <textarea
                    {...register('projectDetails')}
                    className={`${inputClass(!!errors.projectDetails)} resize-none`}
                    placeholder="Опишите проект..."
                    rows={2}
                    disabled={isSubmitting}
                  />
                  {errors.projectDetails && <p className="mt-1 text-xs text-red-500">{errors.projectDetails.message}</p>}
                </div>
              </>
            )}

            {formType === 'бриф' && (
              <>
                <div>
                  <label className={labelClass}>Тип брифа <span className="text-red-500">*</span></label>
                  <select
                    {...register('briefType')}
                    className={inputClass(!!errors.briefType)}
                    disabled={isSubmitting}
                  >
                    <option value="">Выберите тип</option>
                    <option value="video_brief">Бриф на видеопродакшн</option>
                    <option value="creative_brief">Креативный бриф</option>
                    <option value="technical_brief">Технический бриф</option>
                    <option value="full_brief">Полный бриф</option>
                  </select>
                  {errors.briefType && <p className="mt-1 text-xs text-red-500">{errors.briefType.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Детали проекта <span className="text-red-500">*</span></label>
                  <textarea
                    {...register('projectDetails')}
                    className={`${inputClass(!!errors.projectDetails)} resize-none`}
                    placeholder="Опишите детали проекта..."
                    rows={2}
                    disabled={isSubmitting}
                  />
                  {errors.projectDetails && <p className="mt-1 text-xs text-red-500">{errors.projectDetails.message}</p>}
                </div>
              </>
            )}

            {formType === 'связь' && (
              <div>
                <label className={labelClass}>Сообщение <span className="text-red-500">*</span></label>
                <textarea
                  {...register('message')}
                  className={`${inputClass(!!errors.message)} resize-none`}
                  placeholder="Напишите, по какому вопросу хотите связаться..."
                  rows={2}
                  disabled={isSubmitting}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-4 py-3 md:px-6 md:py-4 border-t border-gray-100 bg-gray-50/80 space-y-2">
          <div className="flex flex-col-reverse sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => !isSubmitting && onClose()}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Отправка...
                </>
              ) : formType === 'смета' ? 'Получить смету' : formType === 'бриф' ? 'Отправить бриф' : 'Отправить'}
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center sm:text-left">
            {formType === 'смета' && 'Расчёт в течение 24 часов'}
            {formType === 'бриф' && 'Свяжемся в течение 2 часов'}
            {formType === 'связь' && 'Ответим в течение 2 часов'}
          </p>
        </div>
      </form>
    </div>
  )
}

const BTN_LABELS = {
  смета: 'Смета',
  бриф: 'Бриф',
  связь: 'Связаться',
}

export const Services = ({ services, btn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formType, setFormType] = useState('смета')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    if (!isModalOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isModalOpen])

  const openModal = (type) => {
    setFormType(type)
    setSubmitSuccess(false)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  const actions = (btn || []).filter((name) => BTN_LABELS[name])
  const list = Array.isArray(services) && services.length ? services : []

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-0 border-t border-[#2C3E50]/30 gap-2">
      {list.map((item, index) => (
        <div
          key={item.id ?? index}
          className="bg-[#F2E5D4] px-8 py-10 sm:px-12 sm:py-14 border-b border-[#2C3E50]/30 last:border-b-0"
        >
          {item.title && (
            <h4
              className="text-3xl sm:text-4xl font-serif font-bold text-[#2C3E50] uppercase tracking-tight mb-4"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {item.title}
            </h4>
          )}
          {item.descrip && (
            <p className="text-[#5a5a5a] text-base sm:text-lg mb-10 max-w-2xl leading-relaxed">
              {item.descrip}
            </p>
          )}
          <div className="flex flex-row flex-wrap items-center gap-6">
            {actions.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => openModal(name)}
                className="text-[#2C3E50] font-serif font-medium hover:opacity-90 transition-opacity"
              >
                {BTN_LABELS[name]}
              </button>
            ))}
          </div>
        </div>
      ))}

      {isModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop на весь viewport — без белых рамок на desktop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative w-full h-full md:h-auto md:max-w-lg md:max-h-[90vh] flex items-center justify-center md:p-0">
            {submitSuccess ? (
              <div className="bg-white rounded-2xl shadow-xl px-6 py-8 text-center max-w-sm w-full">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Заявка отправлена</h4>
                <p className="text-sm text-gray-500">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <ModalForm
                key={formType}
                formType={formType}
                onClose={closeModal}
                onSuccess={() => setSubmitSuccess(true)}
              />
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
