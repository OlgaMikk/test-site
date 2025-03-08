class MaxRelationFormMixin:
    @staticmethod
    def validate_max_relations(cleaned_data, field_name, limit, errors_dict, error_message):
        field_data = cleaned_data.get(field_name)

        if not field_data:
            return

        if field_data.count() > limit:
            errors_dict.update({field_name: error_message.format(limit=limit)})
