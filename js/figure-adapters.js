/*
 * Stat Dashboard v2 — Figure adapters
 *
 * Contract JSON -> Vega-Lite
 *
 * The dashboard intentionally keeps this translation isolated here.
 * Adding a new graph type should normally mean adding one adapter below,
 * not rewriting the rest of the application.
 */

(function () {
  "use strict";

  function clean(value) {
    return value === undefined ? null : value;
  }

  function mappingField(mapping, key) {
    const value = mapping?.[key];

    if (typeof value === "string") {
      return value;
    }

    if (value && typeof value === "object") {
      return value.field ?? value.name ?? null;
    }

    return null;
  }

  function mappingType(mapping, key, fallback) {
    const value = mapping?.[key];

    if (value && typeof value === "object" && value.type) {
      return value.type;
    }

    return fallback;
  }

  function axisFromContract(axis, fallbackTitle) {
    if (!axis && !fallbackTitle) {
      return undefined;
    }

    const result = {};

    if (axis?.title !== undefined) {
      result.title = axis.title;
    } else if (fallbackTitle) {
      result.title = fallbackTitle;
    }

    if (axis?.format) {
      result.format =
        axis.format === "percent"
          ? ".0%"
          : axis.format;
    }

    if (axis?.min !== undefined || axis?.max !== undefined) {
      result.domain = [
        axis?.min ?? 0,
        axis?.max ?? 1
      ];
    }

    return result;
  }

  function scaleFromAxis(axis) {
    if (!axis) return undefined;

    const scale = {};

    if (axis.min !== undefined && axis.min !== null && axis.min !== "") {
      const min = Number(axis.min);
      if (Number.isFinite(min)) {
        scale.domainMin = min;
      }
    }

    if (axis.max !== undefined && axis.max !== null && axis.max !== "") {
      const max = Number(axis.max);
      if (Number.isFinite(max)) {
        scale.domainMax = max;
      }
    }

    if (axis.zero !== undefined) {
      scale.zero = axis.zero;
    }

    return Object.keys(scale).length
      ? scale
      : undefined;
  }

  function labelMap(content, field) {
    const map = content?.labels?.[field];
    return map && typeof map === "object"
      ? map
      : null;
  }

  function labelExpr(content, field) {
    const map = labelMap(content, field);
    if (!map) return undefined;

    const pairs = Object.entries(map)
      .map(([key, value]) => {
        return `${JSON.stringify(String(key))}:${JSON.stringify(String(value))}`;
      })
      .join(",");

    return `({${pairs}})[toString(datum.label)] || datum.label`;
  }

  function axisWithLabels(content, field, axis, fallbackTitle) {
    const result = axisFromContract(axis, fallbackTitle) ?? {};
    const expr = labelExpr(content, field);
    if (expr) result.labelExpr = expr;
    return result;
  }

  function legendWithLabels(content, field, title) {
    const result = { title };
    const expr = labelExpr(content, field);
    if (expr) result.labelExpr = expr;
    return applyLegendOptions(content, result);
  }


  const DEFAULT_SERIES_COLORS = [
    "#4C78A8",
    "#F58518",
    "#54A24B",
    "#E45756",
    "#72B7B2",
    "#B279A2",
    "#FF9DA6",
    "#9D755D",
    "#BAB0AC"
  ];

  function seriesColorScale(content, field) {
    if (!field || !Array.isArray(content?.data)) {
      return undefined;
    }

    const seen = new Set();
    const domain = [];

    content.data.forEach(row => {
      const value = row?.[field];
      const key = String(value);

      if (
        value !== undefined &&
        value !== null &&
        !seen.has(key)
      ) {
        seen.add(key);
        domain.push(value);
      }
    });

    if (!domain.length) return undefined;

    return {
      domain,
      range: domain.map((value, index) => {
        return (
          content?.series_styles?.[field]?.[String(value)]?.color ??
          DEFAULT_SERIES_COLORS[index % DEFAULT_SERIES_COLORS.length]
        );
      })
    };
  }

  function legendOrient(content) {
    const position = content?.legend?.position ?? "right";
    return ["left", "right", "top", "bottom"].includes(position)
      ? position
      : "right";
  }

  function legendThemeProps(content) {
    const theme = content?.legend?.theme ?? "none";

    if (theme === "soft") {
      return {
        fillColor: "#F6F8FA",
        strokeColor: "#D8DEE6",
        cornerRadius: 8,
        padding: 10
      };
    }

    if (theme === "outline") {
      return {
        fillColor: "white",
        strokeColor: "#AEB8C4",
        cornerRadius: 6,
        padding: 10
      };
    }

    if (theme === "solid") {
      return {
        fillColor: "#E9EEF4",
        strokeColor: "#9EABB9",
        cornerRadius: 6,
        padding: 10
      };
    }

    return {};
  }

  function applyLegendOptions(content, legend) {
    if (legend === null) return null;

    return {
      ...(legend ?? {}),
      orient: legendOrient(content),
      ...legendThemeProps(content)
    };
  }


  function appearanceOf(content) {
    return content?.appearance ?? {};
  }

  function axisAppearance(content, axisName) {
    const appearance =
      appearanceOf(content);

    const axis =
      appearance?.axes?.[axisName] ?? {};

    return {
      font:
        axis.font ??
        appearance.font ??
        "system-ui",
      color:
        axis.color ??
        "#1f2937",
      lineColor:
        axis.line_color ??
        "#4b5563"
    };
  }

  function decorateAxis(content, axisName, axisConfig) {
    const a =
      axisAppearance(
        content,
        axisName
      );

    return {
      ...(axisConfig ?? {}),
      labelFont: a.font,
      titleFont: a.font,
      labelColor: a.color,
      titleColor: a.color,
      domainColor: a.lineColor,
      tickColor: a.lineColor
    };
  }

  function baseSpec(content) {
    const appearance =
      appearanceOf(content);

    const globalFont =
      appearance.font ??
      "system-ui";

    const gridColor =
      appearance.grid_color ??
      "#e7ebf0";

    const plotBackground =
      appearance.plot_background ??
      "#ffffff";

    return {
      $schema:
        "https://vega.github.io/schema/vega-lite/v5.json",
      background:
        appearance.background ??
        "white",
      data: {
        values: Array.isArray(content?.data)
          ? content.data
          : []
      },
      config: {
        font: globalFont,
        view: {
          stroke: null,
          fill: plotBackground
        },
        axis: {
          labelFont: globalFont,
          titleFont: globalFont,
          labelFontSize: 12,
          titleFontSize: 13,
          titleFontWeight: 600,
          gridColor
        },
        legend: {
          labelFont: globalFont,
          titleFont: globalFont,
          labelFontSize: 12,
          titleFontSize: 12
        }
      }
    };
  }

  function pointMark(content) {
    const p = content?.parameters ?? {};

    return {
      type: "point",
      filled: p.filled ?? true,
      size: p.size ?? 75,
      opacity: p.opacity ?? 0.85
    };
  }

  function scatter(content) {
    const mapping = content.mapping ?? {};
    const x = mappingField(mapping, "x");
    const y = mappingField(mapping, "y");
    const colorField =
      mappingField(mapping, "color") ??
      mappingField(mapping, "group") ??
      mappingField(mapping, "fill");

    if (!x || !y) {
      throw new Error(
        "scatter precisa de mapping.x e mapping.y."
      );
    }

    const p = content.parameters ?? {};
    const base = baseSpec(content);

    base.width = "container";
    base.height = p.height ?? 420;

    if (!colorField) {
      const singleStyle =
        content?.series_styles?.["__all__"]?.["Pontos"] ?? {};

      base.mark = {
        type: "point",
        filled: true,
        color:
          singleStyle.color ??
          "#4C78A8",
        size:
          singleStyle.point_size ??
          p.size ??
          75,
        opacity:
          singleStyle.opacity ??
          p.opacity ??
          0.85,
        shape:
          singleStyle.point_shape ??
          "circle"
      };

      base.encoding = {
        x: {
          field: x,
          type: mappingType(mapping, "x", "quantitative"),
          axis: decorateAxis(content, "x", axisFromContract(content?.axes?.x, x)),
          scale: scaleFromAxis(content?.axes?.x)
        },
        y: {
          field: y,
          type: mappingType(mapping, "y", "quantitative"),
          axis: decorateAxis(content, "y", axisFromContract(content?.axes?.y, y)),
          scale: scaleFromAxis(content?.axes?.y)
        }
      };

      return base;
    }

    const values = [];
    const seen = new Set();

    (content.data ?? []).forEach(row => {
      const value = row?.[colorField];
      const key = String(value);

      if (
        value !== undefined &&
        value !== null &&
        !seen.has(key)
      ) {
        seen.add(key);
        values.push(value);
      }
    });

    const layers = values.map((rawValue, index) => {
      const key = String(rawValue);
      const style =
        content?.series_styles?.[colorField]?.[key] ?? {};

      const color =
        style.color ??
        DEFAULT_SERIES_COLORS[index % DEFAULT_SERIES_COLORS.length];

      const size =
        style.point_size ??
        p.size ??
        75;

      const opacity =
        style.opacity ??
        p.opacity ??
        0.85;

      const shape =
        style.point_shape ??
        "circle";

      return {
        transform: [
          {
            filter:
              `datum[${JSON.stringify(colorField)}] === ` +
              `${JSON.stringify(rawValue)}`
          }
        ],
        mark: {
          type: "point",
          filled: true,
          color,
          size,
          opacity,
          shape
        },
        encoding: {
          x: {
            field: x,
            type: mappingType(mapping, "x", "quantitative"),
            axis: decorateAxis(content, "x", axisFromContract(content?.axes?.x, x)),
            scale: scaleFromAxis(content?.axes?.x)
          },
          y: {
            field: y,
            type: mappingType(mapping, "y", "quantitative"),
            axis: decorateAxis(content, "y", axisFromContract(content?.axes?.y, y)),
            scale: scaleFromAxis(content?.axes?.y)
          }
        }
      };
    });

    const legendLayer = {
      mark: {
        type: "point",
        opacity: 0
      },
      encoding: {
        color: {
          field: colorField,
          type: "nominal",
          scale: seriesColorScale(content, colorField),
          legend:
            p.show_legend === false
              ? null
              : legendWithLabels(
                  content,
                  colorField,
                  content?.legend?.title ?? colorField
                )
        }
      }
    };

    return {
      $schema:
        "https://vega.github.io/schema/vega-lite/v5.json",
      background: "white",
      data: {
        values: Array.isArray(content?.data)
          ? content.data
          : []
      },
      width: "container",
      height: p.height ?? 420,
      layer: [
        ...layers,
        legendLayer
      ],
      config: base.config
    };
  }

  function facetedScatter(content) {
    const mapping = content.mapping ?? {};
    const facetField =
      mappingField(mapping, "facet") ??
      mappingField(mapping, "column") ??
      mappingField(mapping, "panel");

    const x = mappingField(mapping, "x");
    const y = mappingField(mapping, "y");

    if (!facetField || !x || !y) {
      throw new Error(
        "faceted_scatter precisa de mapping.x, mapping.y e mapping.facet."
      );
    }

    const p = content.parameters ?? {};
    const colorField =
      mappingField(mapping, "color") ??
      mappingField(mapping, "group") ??
      mappingField(mapping, "fill");

    const facetValues = [];
    const seen = new Set();

    (content.data ?? []).forEach(row => {
      const value = row?.[facetField];
      const key = String(value);

      if (
        value !== undefined &&
        value !== null &&
        !seen.has(key)
      ) {
        seen.add(key);
        facetValues.push(value);
      }
    });

    const columnsRaw = Number(p.facet_columns);
    const columns =
      Number.isFinite(columnsRaw) && columnsRaw > 0
        ? Math.floor(columnsRaw)
        : undefined;

    const specs = facetValues.map((facetValue, facetIndex) => {
      const facetKey = String(facetValue);

      const facetColor =
        content?.facet_styles?.[facetField]?.[facetKey]?.color;

      const filteredContent = {
        ...content,
        data: (content.data ?? []).filter(
          row => String(row?.[facetField]) === facetKey
        )
      };

      let inner = scatter(filteredContent);

      /*
       * Se houver override de cor do painel, aplicamos só quando
       * não há uma série categórica explícita. Assim não conflita
       * com o editor de séries.
       */
      if (facetColor && !colorField) {
        if (inner.mark) {
          inner.mark = {
            ...inner.mark,
            color: facetColor
          };
        }

        if (Array.isArray(inner.layer)) {
          inner.layer = inner.layer.map(layer => ({
            ...layer,
            mark: {
              ...(layer.mark ?? {}),
              color: facetColor
            }
          }));
        }
      }

      return {
        title: {
          text:
            content?.facet_labels?.[facetField]?.[facetKey] ??
            String(facetValue),
          fontSize: 13,
          fontWeight: 700
        },
        width:
          p.facet_width ??
          p.width ??
          280,
        height:
          p.facet_height ??
          p.height ??
          300,
        ...(
          inner.layer
            ? {
                layer: inner.layer,
                data: inner.data,
                config: inner.config
              }
            : {
                mark: inner.mark,
                encoding: inner.encoding,
                data: inner.data,
                config: inner.config
              }
        )
      };
    });

    const rows = [];
    const perRow = columns ?? specs.length;

    for (let i = 0; i < specs.length; i += perRow) {
      rows.push({
        hconcat: specs.slice(i, i + perRow),
        spacing: 16
      });
    }

    return {
      $schema:
        "https://vega.github.io/schema/vega-lite/v5.json",
      background: "white",
      vconcat: rows,
      spacing: 18,
      config: baseSpec(content).config
    };
  }

  function histogram(content) {
    const mapping = content.mapping ?? {};
    const x =
      mappingField(mapping, "x") ??
      mappingField(mapping, "value");

    if (!x) {
      throw new Error(
        "histogram precisa de mapping.x ou mapping.value."
      );
    }

    const spec = baseSpec(content);
    const p = content.parameters ?? {};

    const group =
      mappingField(mapping, "group") ??
      mappingField(mapping, "color") ??
      mappingField(mapping, "fill");

    spec.width = "container";
    spec.height = p.height ?? 420;

    if (!group) {
      const style =
        content?.series_styles?.["__all__"]?.["Pontos"] ??
        content?.series_styles?.["__all__"]?.["Barras"] ??
        {};

      spec.mark = {
        type: "bar",
        color:
          style.color ??
          "#4C78A8",
        opacity:
          style.opacity ??
          p.opacity ??
          0.9
      };

      spec.encoding = {
        x: {
          field: x,
          type: "quantitative",
          bin: {
            maxbins: p.bins ?? 20
          },
          axis:
            axisFromContract(
              content?.axes?.x,
              x
            ),
          scale:
            scaleFromAxis(
              content?.axes?.x
            )
        },

        y: {
          aggregate: "count",
          type: "quantitative",
          axis:
            decorateAxis(
              content,
              "y",
              axisFromContract(
                content?.axes?.y,
                "Frequência"
              )
            ),
          scale:
            scaleFromAxis(
              content?.axes?.y
            )
        }
      };

      return spec;
    }

    spec.mark = {
      type: "bar",
      opacity: p.opacity ?? 0.9
    };

    spec.encoding = {
      x: {
        field: x,
        type: "quantitative",
        bin: {
          maxbins: p.bins ?? 20
        },
        axis:
          axisFromContract(
            content?.axes?.x,
            x
          ),
        scale:
          scaleFromAxis(
            content?.axes?.x
          )
      },

      y: {
        aggregate: "count",
        type: "quantitative",
        axis:
          axisFromContract(
            content?.axes?.y,
            "Frequência"
          ),
        scale:
          scaleFromAxis(
            content?.axes?.y
          )
      },

      color: {
        field: group,
        type: "nominal",
        scale:
          seriesColorScale(
            content,
            group
          ),
        legend:
          p.show_legend === false
            ? null
            : legendWithLabels(
                content,
                group,
                content?.legend?.title ?? group
              )
      }
    };

    return spec;
  }

  function density(content) {
    const mapping = content.mapping ?? {};
    const x =
      mappingField(mapping, "x") ??
      mappingField(mapping, "value");

    if (!x) {
      throw new Error(
        "density precisa de mapping.x ou mapping.value."
      );
    }

    const p = content.parameters ?? {};
    const group =
      mappingField(mapping, "group") ??
      mappingField(mapping, "color");

    const sourceData =
      Array.isArray(content?.data)
        ? content.data
        : [];

    const numericValues = sourceData
      .map(row => Number(row?.[x]))
      .filter(Number.isFinite);

    if (!numericValues.length) {
      throw new Error(
        `density não encontrou valores numéricos válidos em ${x}.`
      );
    }

    const dataMin = Math.min(...numericValues);
    const dataMax = Math.max(...numericValues);
    const dataRange =
      dataMax > dataMin
        ? dataMax - dataMin
        : Math.max(Math.abs(dataMax), 1);

    /*
     * ggplot2/stat_density normalmente desenha a estimativa além do
     * mínimo/máximo observado, permitindo que a curva decaia em direção
     * a zero. Vega-Lite, quando não recebe extent, tende a limitar a KDE
     * ao domínio dos próprios dados, o que pode fazer uma série terminar
     * abruptamente.
     *
     * O Contract V2 pode controlar isso com:
     *   parameters.density_padding_ratio
     *   parameters.density_steps
     *
     * Padrão: 15% do intervalo observado em cada lado.
     */
    const paddingRatio =
      Number.isFinite(Number(p.density_padding_ratio))
        ? Math.max(0, Number(p.density_padding_ratio))
        : 0.15;

    const padding = dataRange * paddingRatio;

    const explicitXMin =
      content?.axes?.x?.min !== undefined &&
      content?.axes?.x?.min !== null &&
      content?.axes?.x?.min !== ""
        ? Number(content.axes.x.min)
        : null;

    const explicitXMax =
      content?.axes?.x?.max !== undefined &&
      content?.axes?.x?.max !== null &&
      content?.axes?.x?.max !== ""
        ? Number(content.axes.x.max)
        : null;

    /*
     * Se o usuário definiu limites manualmente, eles viram também
     * o domínio da KDE. Caso contrário, usamos um domínio global
     * compartilhado e expandido.
     */
    const sharedExtent = [
      Number.isFinite(explicitXMin)
        ? explicitXMin
        : dataMin - padding,
      Number.isFinite(explicitXMax)
        ? explicitXMax
        : dataMax + padding
    ];

    const densitySteps =
      Number.isFinite(Number(p.density_steps))
        ? Math.max(50, Math.floor(Number(p.density_steps)))
        : 220;

    const base = baseSpec(content);

    const xEncoding = {
      field: "value",
      type: "quantitative",
      axis: decorateAxis(content, "x", axisFromContract(content?.axes?.x, x)),
      /*
       * Mantém o eixo coerente com o domínio usado para calcular a KDE.
       * Limites explícitos continuam tendo prioridade.
       */
      scale: {
        ...(
          scaleFromAxis(content?.axes?.x) ?? {}
        ),
        domainMin: sharedExtent[0],
        domainMax: sharedExtent[1]
      }
    };

    const yEncoding = {
      field: "density",
      type: "quantitative",
      axis: axisFromContract(
        content?.axes?.y,
        "Densidade"
      ),
      scale: scaleFromAxis(content?.axes?.y)
    };

    if (!group) {
      base.transform = [{
        density: x,
        bandwidth: p.bandwidth ?? undefined,
        extent: sharedExtent,
        steps: densitySteps
      }];

      base.width = "container";
      base.height = p.height ?? 420;

      base.mark = {
        type: "area",
        opacity:
          p.alpha ??
          p.opacity ??
          0.35,
        line:
          p.show_line === false
            ? false
            : {
                strokeWidth:
                  p.line_width ?? 2
              }
      };

      base.encoding = {
        x: xEncoding,
        y: yEncoding
      };

      return base;
    }

    const values = [];
    const seen = new Set();

    sourceData.forEach(row => {
      const value = row?.[group];
      const key = String(value);

      if (
        value !== undefined &&
        value !== null &&
        !seen.has(key)
      ) {
        seen.add(key);
        values.push(value);
      }
    });

    const layers = values.map(
      (rawValue, index) => {
        const key = String(rawValue);

        const style =
          content
            ?.series_styles
            ?.[group]
            ?.[key] ?? {};

        const color =
          style.color ??
          DEFAULT_SERIES_COLORS[
            index %
            DEFAULT_SERIES_COLORS.length
          ];

        const opacity =
          style.opacity ??
          p.alpha ??
          p.opacity ??
          0.35;

        const lineWidth =
          style.line_width ??
          p.line_width ??
          2;

        const fillVisible =
          style.fill_visible !== false;

        return {
          transform: [
            {
              filter:
                `datum[${JSON.stringify(group)}] === ` +
                `${JSON.stringify(rawValue)}`
            },
            {
              density: x,
              bandwidth:
                p.bandwidth ??
                undefined,
              extent: sharedExtent,
              steps: densitySteps
            }
          ],

          mark: {
            type: "area",
            color,
            opacity:
              fillVisible
                ? opacity
                : 0,

            line:
              p.show_line === false
                ? false
                : {
                    color,
                    strokeWidth:
                      lineWidth,
                    opacity
                  }
          },

          encoding: {
            x: xEncoding,
            y: yEncoding
          }
        };
      }
    );

    /*
     * Camada invisível apenas para gerar legenda sincronizada
     * com labels + cores das séries.
     */
    const legendLayer = {
      mark: {
        type: "point",
        opacity: 0
      },

      encoding: {
        color: {
          field: group,
          type: "nominal",
          scale:
            seriesColorScale(
              content,
              group
            ),

          legend:
            content
              ?.parameters
              ?.show_legend === false
              ? null
              : legendWithLabels(
                  content,
                  group,
                  content
                    ?.legend
                    ?.title ??
                    group
                )
        }
      }
    };

    return {
      $schema:
        "https://vega.github.io/schema/vega-lite/v5.json",

      background: "white",

      data: {
        values: sourceData
      },

      width: "container",
      height: p.height ?? 420,

      layer: [
        ...layers,
        legendLayer
      ],

      config: base.config
    };
  }

  function boxplot(content) {
    const mapping = content.mapping ?? {};
    const x =
      mappingField(mapping, "x") ??
      mappingField(mapping, "group");

    const y =
      mappingField(mapping, "y");

    if (!x || !y) {
      throw new Error(
        "boxplot precisa de mapping.x e mapping.y."
      );
    }

    const p = content.parameters ?? {};
    const spec = baseSpec(content);

    const colorField =
      mappingField(mapping, "color") ??
      mappingField(mapping, "group") ??
      x;

    const colorScale =
      seriesColorScale(
        content,
        colorField
      );

    spec.width = "container";
    spec.height = p.height ?? 420;

    /*
     * Vega-Lite boxplot compound mark aceita opacity e size no mark.
     * A cor vem da categoria/série e é sincronizada com a legenda.
     */
    spec.mark = {
      type: "boxplot",
      extent: p.extent ?? 1.5,
      size:
        p.width
          ? p.width * 60
          : undefined,
      opacity:
        p.opacity ??
        p.alpha ??
        0.85
    };

    spec.encoding = {
      x: {
        field: x,
        type: "nominal",
        axis:
          axisWithLabels(
            content,
            x,
            content?.axes?.x,
            x
          )
      },

      y: {
        field: y,
        type: "quantitative",
        axis:
          axisFromContract(
            content?.axes?.y,
            y
          ),
        scale:
          scaleFromAxis(
            content?.axes?.y
          )
      },

      color: {
        field: colorField,
        type: "nominal",
        scale: colorScale,
        legend:
          p.show_legend === false
            ? null
            : legendWithLabels(
                content,
                colorField,
                content?.legend?.title ??
                colorField
              )
      }
    };

    return spec;
  }

  function stackedBarPercent(content) {
    const mapping = content.mapping ?? {};
    const x = mappingField(mapping, "x");
    const fill =
      mappingField(mapping, "fill") ??
      mappingField(mapping, "color") ??
      mappingField(mapping, "series");

    if (!x || !fill) {
      throw new Error(
        "stacked_bar_percent precisa de mapping.x e mapping.fill/color/series."
      );
    }

    const p = content.parameters ?? {};
    const spec = baseSpec(content);

    spec.width = "container";
    spec.height = p.height ?? 420;
    spec.mark = {
      type: "bar",
      opacity: p.opacity ?? 1
    };

    spec.encoding = {
      x: {
        field: x,
        type: "nominal",
        axis: decorateAxis(content, "x", axisWithLabels(content, x, content?.axes?.x, x))
      },
      y: {
        aggregate: "count",
        stack: "normalize",
        type: "quantitative",
        axis: {
          ...axisFromContract(
            content?.axes?.y,
            "Proporção (%)"
          ),
          format: ".0%"
        },
        scale: (() => {
          const axis = content?.axes?.y;
          if (!axis) return undefined;

          const scale = {};

          if (axis.min !== undefined && axis.min !== null && axis.min !== "") {
            const min = Number(axis.min);
            if (Number.isFinite(min)) {
              scale.domainMin = min / 100;
            }
          }

          if (axis.max !== undefined && axis.max !== null && axis.max !== "") {
            const max = Number(axis.max);
            if (Number.isFinite(max)) {
              scale.domainMax = max / 100;
            }
          }

          return Object.keys(scale).length
            ? scale
            : undefined;
        })()
      },
      color: {
        field: fill,
        type: "nominal",
        scale: seriesColorScale(content, fill),
        legend: content?.parameters?.show_legend === false
          ? null
          : legendWithLabels(
              content,
              fill,
              content?.legend?.title ?? fill
            )
      }
    };

    return spec;
  }

  function pie(content) {
    const mapping = content.mapping ?? {};
    const category =
      mappingField(mapping, "category") ??
      mappingField(mapping, "color") ??
      mappingField(mapping, "fill") ??
      mappingField(mapping, "label");

    const value =
      mappingField(mapping, "value") ??
      mappingField(mapping, "y");

    if (!category) {
      throw new Error(
        "pie precisa de mapping.category/color/fill/label."
      );
    }

    const p = content.parameters ?? {};
    const spec = baseSpec(content);

    spec.width = p.width ?? 420;
    spec.height = p.height ?? 420;
    spec.mark = {
      type: "arc",
      innerRadius: p.inner_radius ?? 0,
      outerRadius: p.outer_radius ?? undefined
    };

    spec.encoding = {
      theta: value
        ? {
            field: value,
            type: "quantitative"
          }
        : {
            aggregate: "count",
            type: "quantitative"
          },
      color: {
        field: category,
        type: "nominal",
        scale: seriesColorScale(content, category),
        legend: content?.parameters?.show_legend === false
          ? null
          : legendWithLabels(
              content,
              category,
              content?.legend?.title ?? category
            )
      },
      tooltip: value
        ? [
            {
              field: category,
              type: "nominal"
            },
            {
              field: value,
              type: "quantitative"
            }
          ]
        : [
            {
              field: category,
              type: "nominal"
            },
            {
              aggregate: "count",
              type: "quantitative"
            }
          ]
    };

    return spec;
  }

  const adapters = {
    scatter,
    faceted_scatter: facetedScatter,
    histogram,
    density,
    boxplot,
    stacked_bar_percent: stackedBarPercent,
    pie
  };

  function toVegaLite(content) {
    const type = content?.type;

    if (!type) {
      throw new Error(
        "O gráfico não possui o campo type."
      );
    }

    const adapter = adapters[type];

    if (!adapter) {
      throw new Error(
        `Tipo de gráfico ainda não suportado pelo adapter v1: ${type}.`
      );
    }

    return adapter(content);
  }

  window.StatFigureAdapters = {
    adapters,
    toVegaLite,
    supportedTypes: Object.keys(adapters)
  };
})();
